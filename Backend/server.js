import app from './src/app.js';
import { connectToDB } from './src/config/database.js'
import { initSocket } from './src/sockets/server.socket.js';
import { createServer } from 'http';

connectToDB();

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(3000, () => {
    console.log("server is running on port 3000");
})