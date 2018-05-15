var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
 
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb://user:user@ds219000.mlab.com:19000/lynda-node'

var Message = mongoose.model('Message', {
  name: String,
  message: String
})

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

// In order to work with await, we will need to declare our express function as async.
// async/await is similar to promises. Promises give us another option of how to work 
// with asynchronous code. Promises return an object which promise to do some work. 
// This object has separate callbacks for success and for failures.
app.post('/messages', async (req, res) => {

  try {
    var message = new Message(req.body)

    var savedMessage = await message.save()
    console.log('saved')

    var censored = await Message.findOne({ message: 'badword' })

    if (censored)
      await Message.remove({ _id: censored.id })
    else
      io.emit('message', req.body)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
    return console.error(error)
  } finally { // finally is rarely used. Mostly it is just try catch.
    console.log('message post called')
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

mongoose.connect(dbUrl, (err) => {
  console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
  console.log('server is listening on port', server.address().port)
})