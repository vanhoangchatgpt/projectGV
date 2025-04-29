const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const tesseract = require('tesseract.js');

exports.readFileContent = async (file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filePath = file.path;

    let content = '';

    if (ext === '.pdf') {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        content = data.text;
    } else if (ext === '.doc' || ext === '.docx') {
        const buffer = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer: buffer });
        content = result.value;
    } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const { data: { text } } = await tesseract.recognize(filePath, 'eng');
        content = text;
    } else if (['.txt', '.csv', '.md', '.json'].includes(ext)) {
        content = fs.readFileSync(filePath, 'utf-8');
    } else {
        throw new Error(`Unsupported file type: ${ext}. Allowed types are PDF, DOC, DOCX, JPG, JPEG, PNG, TXT, CSV, MD, JSON.`);
    }

    if (!content || content.trim() === '') {
        throw new Error('Uploaded file is empty or invalid.');
    }

    return content;
};

