Vue.component('gif-converter', {
    data() {
        return {
            loading:false,
            gifImg: '',
            img: [{ src: 'https://pbs.twimg.com/media/DtmvNazX4AAJ906.jpg:large', text: 'ini pertama' }, { src: 'https://pbs.twimg.com/media/DtnTszQWkAUJvLL.jpg', text: 'ini pertama' }]
        }
    },
    props: [],
    methods: {
        convertGif() {
            this.loading = true
            const self = this
            gifshot.createGIF({
                'images': self.img
            }, function (obj) {
                if (!obj.error) {
                    var image = obj.image
                    //     animatedImage = document.createElement('img');
                    // animatedImage.src = image;
                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000',
                        data: {
                            img: image
                        }
                    })
                    .then(data => {
                        self.gifImg = data.data.url
                        self.loading=false
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
        <div>
            <button @click="convertGif">asdasd</button>
            <br>
            <img :src="gifImg" alt="">
            <img v-if="loading == true" src="https://i.redd.it/ounq1mw5kdxy.gif" alt="">
        </div>
    `

})