const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/message')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3005
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New Websocket connection')
    socket.on('increment', () => {
        count++
        console.log(count)
        // 個別用戶
        socket.emit('countUpdated', count)
    })

    // 當使用者加入聊天室時 廣播
    socket.broadcast.emit('message', generateMessage('a new user has join'))

    // 傳送地理位置
    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    // socket.emit('message', 'Welcome')
    socket.on('sendMessage', (message, callback) => {
        // 全部用戶

        // 髒話篩選
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('profanity is not allowed')
        }
        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', 'A user has left')
    })

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })
        // if (error) return callback(error)
        // 加入聊天室
        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
        // callback()
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})