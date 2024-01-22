import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { router } from './router.js';
import { connect } from './db.js';
import { logError, boomErrorHandler, errorHandler } from './middlewares/error.handlers.js';

const app = express();
app.use(express.json());
app.use(cors());

await connect(process.env.MONGO_URI as string);

// Remove this route on production
app.get('/', (req, res) => {
    res.send('Hello World!');
});

router(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});