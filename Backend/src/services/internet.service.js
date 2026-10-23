import { tavily } from '@tavily/core';
import 'dotenv/config';

const client = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

export const search = async ({ query }) => {
    const response = await client.search(query,
        {
            searchDepth: "basic",
            maxResults: "2"
        })

    return response.results;
}