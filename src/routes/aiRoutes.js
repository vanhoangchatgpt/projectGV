const express = require('express');
const multer = require('multer');
const router = express.Router();

// Khởi tạo multer
const upload = multer({ dest: 'uploads/' }); // Cấu hình để lưu file vào thư mục 'uploads'

// Import controller 
const { createAnAnswerController } = require('../controllers/aiController');

// Định nghĩa route
router.post('/create-answer', upload.single('file'), createAnAnswerController);

module.exports = router;
