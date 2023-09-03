const mongoose=require('mongoose')
 const connectToDB = (url)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        // useCreateIndex:true,
        // useFindAndModify:false,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('connection suceeded')
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports =connectToDB