import { Application } from 'express';

import userRouter from './components/user/controller.js';
import authRouter from './components/auth/controller.js';
import productRouter from './components/product/controller.js';

export const router = (app: Application) => {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/products', productRouter);
};