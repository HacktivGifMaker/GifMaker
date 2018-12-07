const gif = require('../public/gifshot')
const base64 = require('base64-to-image')
const fs = require('fs')
const { Storage } = require('@google-cloud/storage')
require('dotenv').config()

class Controller {
    static gifConvert(req, res) {
        var base64Data = req.body.img.replace(/^data:image\/gif;base64,/, "");
        let buffer = new Buffer(base64Data, 'base64')

        const CLOUD_BUCKET = process.env.CLOUD_BUCKET
        const storage = new Storage({
            projectId: process.env.GCLOUD_PROJECT,
            keyFilename: process.env.KEYFILE_PATH
        })
        const bucket = storage.bucket(CLOUD_BUCKET)
        // console.log('----------------masuk sini', process.env.CLOUD_BUCKET)
        const gcsname = new Date().getMilliseconds() + '' + Date.now()
        const file = bucket.file(gcsname)
        const stream = file.createWriteStream({
            metadata: {
                contentType: 'image/gif'
            }
        })
        stream.on('finish', () => {
            // console.log(`https://storage.googleapis.com/${CLOUD_BUCKET}/${gcsname}`)
            res.status(201).json({
                url: `https://storage.googleapis.com/${CLOUD_BUCKET}/${gcsname}`
            })
        })
        stream.on('error', (err) => {
            res.status(400).json({
                err
            })
            console.log(err)
        })
        stream.end(buffer)
        // fs.writeFile('coba.gif', base64Data, 'base64', (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        //     res.send('ok')
        // });
    }
}

module.exports = Controller