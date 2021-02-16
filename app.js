const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;


const app = express();

/*
app.get('/taskdetail/htmlrended/customerid', function (req, res, next) {
  console.log('Accessing the secret section ...')
  res.redirect('http://localhost:4001/taskdetail/htmlrended/show.html')
})
*/

const server = http.createServer(app);

const io = socketIo(server, {
	  cors: {
		      origin: "*",
		      methods: ["GET", "POST"]
		    }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  socket.on("keysearch", (msg) => {
    console.log(msg);
  });

  interval = setInterval(() => getHtmlResult(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getHtmlResult = socket => {
  const response = new Date();
  const response2 = ' <li><a href = "http://103.146.23.195:3000/objecthtml/htmlrended/show.html">FABBIS</a></li><li href="url"> FABOO </li>';
  // Emitting a new message. Will be consumed by the client
  socket.emit("htmltag", response2);
};


server.listen(port, () => console.log(`Listening on port ${port}`));