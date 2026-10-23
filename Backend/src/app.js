import epxress from 'express'
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import chatRouter from './routes/chats.route.js';
import path from 'path';

const app = epxress();

app.use(epxress.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(epxress.static("/public"));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname + ".." + "/public/index.html"));
})

app.use(errorHandler);
export default app;