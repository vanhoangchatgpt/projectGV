const {createAnAnswerService} = require('../services/aiService');

let createAnAnswerController = async (req, res) => {
    const {question} = req.body;

    if(!question) {
        return res.status(400).json({ message:"Please provide question."});
    }

    try {
        let answerStructure = await createAnAnswerService(question);

        res.status(200).json({
            answer: answerStructure.trim()
        });
    }catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {createAnAnswerController};