import epxress from 'express'
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import chatRouter from './routes/chats.route.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = epxress();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(epxress.json());
app.use(cookieParser());

app.use(epxress.static("./public"));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
})

app.use(errorHandler);
export default app;