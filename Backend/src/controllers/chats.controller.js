import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, generateContent } from "../services/ai.service.js";

async function messsage(req, res) {
    const { message, chatId } = req.body;
    let chat = null, title = null;

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({ user: req.user.id, title });
    }

    const userMessage = await messageModel.create(
        { chat: chat?._id || chatId, content: message, role: "user" }
    );

    const allMessages = await messageModel
        .find({ chat: chatId || chat?._id })
        .sort({ createdAt: -1 })
        .limit(7)
        .lean();

    const aiContent = await generateContent(allMessages.length ? allMessages : message);

    const aiMessage = await messageModel.create({ chat: chat?._id || chatId, content: aiContent, role: "ai" });

    res.status(201).json({
        success: true,
        code: "AI_RESPONSE",
        message: "successfully generate the content",
        data: {
            chatId: aiMessage.chat,
            chatTitle: title
        }
    })

}

async function getChats(req, res) {

    const chats = await chatModel.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        code: "USER_CHATS",
        message: "successfully fetched chats",
        data: chats
    })
}

async function deleteChat(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({ _id: chatId });
    const messages = await messageModel.deleteMany({ chat: chatId });

    res.status(204).json({
        success: true,
        code: "CHAT_DELETED",
        message: "successfully chat deleted"
    })

}

export default { messsage, getChats, deleteChat }