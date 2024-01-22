import { Application } from 'express';

import userRouter from './components/user/controller.js';

export const router = (app: Application) => {
    app.use('/users', userRouter);
};