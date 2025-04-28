require('dotenv').config();
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createAnAnswerService = async (question) =>{
    try {
        const response = await openai.chat.completions.create({
            model:'gpt-4o-mini',
            messages:[
                {role:'system', content:`You are an expert in this field, please help me answer`},
                {role:'user', content:`${question}`},
            ],
            max_tokens: 14000,
        });
        return response.choices[0].message.content.trim();
    }catch(error) {
        console.error("OpenAI API Error:", error);
        throw new Error(`Cannot create an answer:${error.message}`);
        
    }
};

module.exports = {
    createAnAnswerService
};