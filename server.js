const express = require("express");
const cors = require('cors')
const path = require("path");
const port = process.env.PORT || 5000
const app = express();
const server = require("http").createServer(app);

app.use(cors({
    origin: '*'
}));

// const io = require("socket.io")(server);
const io = require('socket.io')(server, { 
    cors: { origin: '*' } // for Cross-Origin Request Blocked
});
app.use(express.static(path.join(__dirname+"/public")));
 console.log("test")
io.on("connection", function(socket){
    console.log("conected");
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username + "joind the conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + "left the conversation");
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message );
    })
})


server.listen(port);
