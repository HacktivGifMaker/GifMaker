const {Storage} = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

module.exports = {
    sendUploadToGCS: function(req, res, next) {
        if (!req.file) {
            return next()
        }
        const gcsname = Date.now() + "-"
        const file = bucket.file(gcsname)

        const stream = file.createWriteStream({
            metadata: {
            contentType: req.file.mimetype
            }
        })

        stream.on('error', (err) => {
            req.file.cloudStorageError = err
            next(err)
        })

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname
            file.makePublic().then(() => {
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
                res.send({
                    status: 200,
                    message: 'Your file is successfully uploaded',
                    link: req.file.cloudStoragePublicUrl
                })
            })
        })
        
        stream.end(req.file.buffer)
    }
}