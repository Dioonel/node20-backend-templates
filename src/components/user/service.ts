import { UserStore } from "./store.js";
import { UserCreateDTO, UserUpdateDTO } from "./dto.js";

const userStore = UserStore.getInstance();

export class UserService {
    // Singleton pattern
    private static _instance: UserService;
    private constructor() {}
    static getInstance(): UserService {
        if (!UserService._instance) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }


    async getAll() {
        return await userStore.getAll();
    }

    async getById(id: string) {
        return await userStore.getById(id);
    }

    async create(body: UserCreateDTO) {
        return await userStore.create(body);
    }

    async update(id: string, body: UserUpdateDTO) {
        return await userStore.update(id, body);
    }

    async delete(id: string) {
        const user = await userStore.delete(id);
        return { message: `User with id: ${id} deleted.` };
    }
}