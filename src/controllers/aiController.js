const fs = require('fs');
const path = require('path');
const { readFileContent } = require('../services/fileService');
const { createAnAnswerService } = require('../services/aiService');

const createAnAnswerController = async (req, res) => {
    const { question } = req.body;
    const file = req.file;

    if (!question && !file) {
        return res.status(400).json({ message: "Please provide a question or upload a file." });
    }

    try {
        let inputContent = '';

        if (file) {
            // Nếu có file, đọc nội dung file
            inputContent = await readFileContent(file);
        } 
        
        if (question) {
            // Nếu có câu hỏi, nối thêm vào
            inputContent += `\n\nQuestion: ${question}`;
        }

        if (!inputContent || inputContent.trim() === '') {
            return res.status(400).json({ message: "Uploaded file is empty or invalid." });
        }

        // Gửi toàn bộ nội dung + câu hỏi (nếu có) cho AI
        const answer = await createAnAnswerService(inputContent);

        res.status(200).json({
            answer: answer
        });
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { createAnAnswerController };
