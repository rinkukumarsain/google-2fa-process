let mongoose=require('mongoose')
mongoose.set('strictQuery', false)
let url=process.env.URL
mongoose.connect(url).then(()=>{console.log("server is connected")}).catch((e)=>{console.log(e)})