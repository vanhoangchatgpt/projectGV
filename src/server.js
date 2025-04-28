require('dotenv').config();
const express = require('express');
const connection = require('./config/database');
const aiRouters = require('./routes/aiRoutes');

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/v1/api/',aiRouters);

(async () => {
    try {
        //using mongoose
             await connection();

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
