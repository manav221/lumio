import { Router } from 'express';
import { identifyUser } from '../middlewares/auth.middleware.js';
import chatsController from '../controllers/chats.controller.js';

const chatRouter = Router();

chatRouter.get("/", identifyUser, chatsController.getChats);
chatRouter.post("/conversation", identifyUser, chatsController.messsage);
chatRouter.delete("/delete/:chatId", identifyUser, chatsController.deleteChat);

export default chatRouter;