import joi from 'joi';

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    description: string;
    age: number;
    created_at: Date;
}

export interface UserCreateDTO extends Omit<User, 'id' | 'created_at'> {}
export interface UserUpdateDTO extends Partial<UserCreateDTO> {}



export const UserCreateSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    description: joi.string().required(),
    age: joi.number().required(),
});

export const UserUpdateSchema = joi.object({
    email: joi.string().email(),
    username: joi.string(),
    password: joi.string(),
    description: joi.string(),
    age: joi.number(),
});

export const IdSchema = joi.object({
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});