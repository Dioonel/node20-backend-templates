import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { router } from './router.js';

const app = express();
app.use(express.json());
app.use(cors());


// Remove this route on production
app.get('/', (req, res) => {
    res.send('Hello World!');
});

router(app);

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});