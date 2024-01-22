import { UserStore } from "./store.js";
import { UserCreateDTO, UserUpdateDTO } from "./dto.js";
import { AuthService } from "./../auth/service.js";
import { ProductStore } from "./../product/store.js";

const userStore = UserStore.getInstance();
const authService = AuthService.getInstance();
const productStore = ProductStore.getInstance();

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
        const hashedPassword = await authService.hashPassword(body.password);
        body.password = hashedPassword;
        return await userStore.create(body);
    }

    async update(id: string, body: UserUpdateDTO) {
        return await userStore.update(id, body);
    }

    async delete(id: string) {
        await productStore.deleteBySeller(id);
        await userStore.delete(id);
        return { message: `User with id: ${id} deleted.` };
    }
}