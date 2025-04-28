const express = require('express');
const {createAnAnswerController} = require('../controllers/aiController');
const routerAPI = express.Router();

routerAPI.post("/generate-answer", createAnAnswerController);

module.exports = routerAPI;                      