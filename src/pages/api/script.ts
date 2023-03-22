import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
import type { NextApiRequest, NextApiResponse } from 'next'

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
    })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method === "POST") {
        // get message
        const message = req.body;

        // dispatch to channel "message"
        const response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: message,
        })

        return res.status(response.status).json({ user: "User_AI", msg: response.data.choices[0].message?.content })
    }
};
