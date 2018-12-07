Vue.component('gif-converter', {
    data() {
        return {
            loading: false,
            gifImg: '',
            img: [{ src: 'https://pbs.twimg.com/media/DtmvNazX4AAJ906.jpg:large', text: 'ini pertama' }, { src: 'https://pbs.twimg.com/media/DtnTszQWkAUJvLL.jpg', text: 'ini pertama' }]
        }
    },
    props: [],
    methods: {
        cobaCamera() {
            const self = this
            this.loading = true
            this.gifImg = ''
            gifshot.createGIF({
                'gifWidth': 500,
                'gifHeight': 500,
            }, function (obj) {
                if (!obj.error) {
                    let image = obj.image
                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000',
                        data: {
                            img: image
                        }
                    })
                        .then(data => {
                            self.gifImg = data.data.url
                            self.loading = false
                            console.log(data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            });
        },
        convertGif() {
            this.loading = true
            const self = this
            this.gifImg = ''
            gifshot.createGIF({
                'images': self.img,
                'gifWidth': 500,
                'gifHeight': 500,
                'fontSize': '50px',
                'frameDuration': 5,

            }, function (obj) {
                if (!obj.error) {
                    var image = obj.image
                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000',
                        data: {
                            img: image
                        }
                    })
                        .then(data => {
                            self.gifImg = data.data.url
                            self.loading = false
                            console.log(data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        }
    },
    template: `
        <div class="col mt-5">
            <button class="btn btn-dark mr-5" @click="convertGif">Convert picture</button>
            <button class="btn btn-dark" @click="cobaCamera">Use Camera</button>
            <br>
            <img :src="gifImg" alt="">
            <img v-if="loading == true" src="https://i.redd.it/ounq1mw5kdxy.gif" alt="">
            <div id="shareBtn" class="fb-share-button" v-bind:data-href="gifImg" data-layout="button" data-size="large" data-mobile-iframe="true">Share</div> 
        </div>
    `

})