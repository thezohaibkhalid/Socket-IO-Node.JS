const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.resolve("./public/views"));

// Serve static files from the public directory
app.use(express.static(path.resolve("./public")));

// Route to render the login page
app.get("/", (req, res) => {
    return res.render("login");
});


// Socket IO
io.on("connection", (socket) => {
    console.log("A new user connected");

    // Corrected event name here to "message" to match client-side emit
    socket.on("message", (message) => {
        // Emit the received message to all connected clients
        io.emit("message", message);
    });
});

// Start the server
server.listen(9000, () => console.log("Server started at port no 9000"));

