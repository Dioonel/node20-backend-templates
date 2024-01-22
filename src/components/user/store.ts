import { badData, internal, notFound } from "@hapi/boom";

import { userModel } from "./model.js";
import { UserCreateDTO, UserUpdateDTO } from "./dto.js";

export class UserStore {
    // Singleton pattern
    private static _instance: UserStore;
    private constructor() {}
    static getInstance(): UserStore {
        if (!UserStore._instance) {
            UserStore._instance = new UserStore();
        }
        return UserStore._instance;
    }


    async getAll() {
        return await userModel.find()
        .catch((err) => {
            throw internal(`${err.message}`);
        });
    }

    async getById(id: string) {
        return await userModel.findById(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`User with id: ${id} not found.`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async create(user: UserCreateDTO) {
        const newUser = new userModel(user);
        return await newUser.save()
        .catch((err) => {
            if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else if(err.message.includes('email')) {
                throw badData(`Duplicate e-mails are not allowed.`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async update(id: string, user: UserUpdateDTO) {
        return await userModel.findByIdAndUpdate(id, user, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`User with id: ${id} not found.`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async delete(id: string) {
        return await userModel.findByIdAndDelete(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`User with id: ${id} not found.`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }
}