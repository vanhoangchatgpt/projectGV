const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createAnAnswerService = async (content) => {
    try {
        const prompt = `Based on the following content, please answer appropriately:\n\n${content}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: `You are a knowledgeable assistant.` },
                { role: 'user', content: prompt }
            ],
            max_tokens: 4000,
            temperature: 0.2 // (giúp trả lời chính xác hơn, ít sáng tạo)
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw new Error(`Cannot create an answer: ${error.message}`);
    }
};

module.exports = { createAnAnswerService };
