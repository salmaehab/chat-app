const express= require('express')
const app= express()
const mongoose=require('mongoose')
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var socketIo = require('socket.io')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname));
const connectDB= require('./db/db')
const dbUrl='mongodb+srv://salmaehab:salma1178@cluster0.apk4d.mongodb.net/chat-app?retryWrites=true&w=majority'
connectDB(dbUrl)
var Message= mongoose.model('Message',{name:String,message:String})
app.get('/messages',async(req,res)=>{
     Message.find({}).then((response) => {
        res.send(response)
    }).catch((err) => {
        console.log(err)
    })
   
})

const server=app.listen(5000,()=>{
    console.log('listening on port 5000')
})
const io = socketIo(server)
io.on('connection',(socket)=>{
    console.log('connection')
    // socket.on('message', (data) => {
    //     console.log(`New message from ${socket.id}: ${data}`);
    // })
})
app.post('/messages',async (req, res) => {
    var message = new Message(req.body);
    message.save().then((response) => {
        io.emit('message', req.body);

        res.sendStatus(200)
       
        
    }).catch((err) => {
        console.log(err)
    })
  })
