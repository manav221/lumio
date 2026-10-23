import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
    withCredentials: true
});

export default socket;

export const initializeSocketConnection = () => {

    socket.on("connect", () => {
        console.log("connected to socket.io server");
    })
}