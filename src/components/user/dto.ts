import joi from 'joi';

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    description: string;
    age: number;
    role: 'user' | 'customer' | 'admin';
    products: string[];
    created_at: Date;
}

export interface UserCreateDTO extends Omit<User, 'id' | 'created_at' | 'products'> {}
export interface UserUpdateDTO extends Partial<UserCreateDTO> {}



export const UserCreateSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().min(5).required(),
    description: joi.string().required(),
    age: joi.number().required(),
    role: joi.string().valid('user', 'customer', 'admin').required(),
});

export const UserUpdateSchema = joi.object({
    email: joi.string().email(),
    username: joi.string(),
    password: joi.string().min(5),
    description: joi.string(),
    age: joi.number(),
    role: joi.string().valid('user', 'customer', 'admin'),
});

export const IdSchema = joi.object({
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});