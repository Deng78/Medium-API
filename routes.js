module.exports = function(app, axios, list){

    app.get('/', (req, res) => res.send('Please use /all or /posts for api'))

    app.get('/posts', (req, res) =>{
        res.set({'Content-Type': 'application/json'})
        const username = req.headers.username;
        const config ={
            method: 'GET',
            url: `https://medium.com/@${username}/latest`,
            headers:{
                'accept':'application/json'
            }
        }
        // Make Request to Medium
        axios(config)
        .then((response) =>{
            const data = JSON.parse(response.data.substr(16));
            const posts = data.payload.references.Post;
            const post = []
            for (const key of Object.keys(posts)) {
                let title = posts[key].title;
                let subtitle = posts[key].content.subtitle;
                let uniqueSlug = posts[key].uniqueSlug;
                let link = `http://medium.com/@${username}/${uniqueSlug}`;
                let imageURL = `https://cdn-images-1.medium.com/fit/t/1600/480/${posts[key].virtuals.previewImage.imageId}`
                let createdAt = myDate = new Date( posts[key].createdAt);
                post.push({'title' : title, 'subtitle': subtitle, 'postURL': link, 'imageURL': imageURL, 'created': createdAt.toGMTString()})
            }       
            res.send(post)     
        }).catch((error) => {
            throw error;
        })
    })
    
    app.get('/all/posts', (req, res) =>{
        res.set({'Content-Type': 'application/json'})
        const username = req.headers.username;
        const config ={
            method: 'GET',
            url: `https://medium.com/@${username}/latest`,
            headers:{
                'accept':'application/json'
            }
        }
        // Make Request to Medium
        axios(config)
        .then((response) =>{
            const data = JSON.parse(response.data.substr(16));
            res.send(data.payload.references.Post)
        })
        .catch((error) =>{
            throw error;
        })
    })
}