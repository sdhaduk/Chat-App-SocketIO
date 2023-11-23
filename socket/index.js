import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:5173/" });

io.on("connection", (socket) => {
    console.log("New Connection", socket.id);
})

io.listen(8080);
