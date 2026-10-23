import { Server } from 'socket.io';
import { AppError } from '../utils/AppError.js'
import messageModel from '../models/message.model.js';

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("new socket connected");

        socket.on("chat_messages", async (chatId) => {
            const messages = await messageModel.find({ chat: chatId });
            socket.emit("chat_messages", messages);
        })
    })
}

export function getIo() {
    if (!io) {
        throw new AppError("socket.io not initialized");
    }

    return io;
}