const express = require('express')
const app = express()

const http = require("http")
const { Server } = require("socket.io")

const cors = require("cors")
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room", (data)=> {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).broadcast("receive_message", data)
    })
})

server.listen(process.env.PORT || 3000, ()=> {
    console.log("server is running")
})