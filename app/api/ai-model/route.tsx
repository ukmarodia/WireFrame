import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from "openai"
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_AI_API_KEY,

})
export const maxDuration = 300;

export async function POST(req: NextRequest) {
    try {
        const { model, description, imageUrl } = await req.json();
        console.log('Request data:', { model, description, imageUrl });

        const ModelObj = Constants.AiModelList.find(item => item.name == model);
        const modelName = ModelObj?.modelName;
        console.log('Selected model:', modelName);

        if (!process.env.OPENROUTER_AI_API_KEY) {
            console.error('OpenRouter API key not found');
            return new Response('API key not configured', { status: 500 });
        }

        console.log('Making OpenAI request...');
        const response = await openai.chat.completions.create({
            model: modelName ?? 'google/gemini-2.0-flash-thinking-exp:free',
            stream: true,
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": description
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": imageUrl
                            }
                        }
                    ]
                }
            ]
        });
        console.log('OpenAI request successful, starting stream...');

        // Create a readable stream to send data in real-time
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        const text = chunk.choices?.[0]?.delta?.content || "";
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error('Streaming error:', error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });

    } catch (error) {
        console.error('AI Model API Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}