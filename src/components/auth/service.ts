import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserStore } from './../user/store.js';

const userStore = UserStore.getInstance();

export class AuthService {
    private static _instance: AuthService;
    private constructor() {}
    static getInstance(): AuthService {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    async hashPassword(password: string) {
        return await hash(password, 10);
    }

    async signToken(user: any) {
        let payload = {
            sub: user._id,
            username: user.username,
            role: user.role
        };
        const secret: any = process.env.JWT_SECRET;
        return jwt.sign(payload, secret, { expiresIn: '30d' });
    }
}