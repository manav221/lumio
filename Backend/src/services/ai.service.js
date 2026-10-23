import { ChatGoogle } from '@langchain/google';
import { ChatMistralAI } from '@langchain/mistralai';
import { tool, createAgent, HumanMessage, SystemMessage, AIMessage } from 'langchain';
import * as z from 'zod';
import 'dotenv/config';
import { search } from './internet.service.js';
import { getIo } from '../sockets/server.socket.js';
import { SYSTEM_PROMPT } from '../constants/prompt.js';

const modelGemini = new ChatGoogle({
    model: "gemini-3.5-flash-lite"
});
const modelMistral = new ChatMistralAI({
    model: "zai-glm-5-3",
    temperature: 0
});

const searchTool = tool(
    search,
    {
        name: "search_tool",
        description: "search anything with tavily and llm",
        schema: z.object({
            query: z.string()
        })
    }
)

const agent = createAgent({
    model: modelGemini,
    tools: [searchTool],
    systemPrompt: SYSTEM_PROMPT
});

export async function generateChatTitle(message) {
    const io = getIo();
    let fullTitle = "";

    io.emit("ai status", { status: "generating", type: "title" });

    const stream = await modelGemini.stream([
        new SystemMessage("create a title of 2-4 words of the give message"),
        new HumanMessage(message)
    ]);

    for await (const chunk of stream) {
        const token = chunk.content;
        fullTitle += token;

        io.emit("ai token", { type: "title", data: token });
    }

    io.emit("ai complete", { type: "title", data: fullTitle });

    return fullTitle;
}

export async function generateContent(messages) {
    const io = getIo();
    let fullContent = "";

    const formattedMessages = messages?.map(msg => {
        if (msg.role === "user") return new HumanMessage(msg.content);
        else if (msg.role === "ai") return new AIMessage(msg.content);
    })

    io.emit("ai status", { status: "generating", type: "message" });

    const stream = await agent.stream(
        { messages: formattedMessages || [new HumanMessage(messages)] },
        { streamMode: "messages" }
    );

    for await (const [chunk] of stream) {
        const messageType = chunk.type;

        if (messageType !== 'ai') continue;

        if (chunk.tool_call_chunks?.length ||
            chunk.tool_calls?.length) { continue };

        if (typeof chunk.content !== "string" || !chunk.content) { continue };

        const token = chunk.content;
        fullContent += token;
        io.emit("ai token", { type: "message", data: token });
    }

    io.emit("ai complete", { type: "message", data: fullContent });

    return fullContent;
}