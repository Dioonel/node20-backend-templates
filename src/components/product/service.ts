import { unauthorized, notFound } from "@hapi/boom";

import { ProductStore } from "./store.js";
import { ProductCreateDTO, ProductUpdateDTO } from "./dto.js";
import { UserStore } from './../user/store.js';

const productStore = ProductStore.getInstance();
const userStore = UserStore.getInstance();

export class ProductService {
    // Singleton pattern
    private static _instance: ProductService;
    private constructor() {}
    static getInstance(): ProductService {
        if (!ProductService._instance) {
            ProductService._instance = new ProductService();
        }
        return ProductService._instance;
    }


    async getAll() {
        return await productStore.getAll();
    }

    async getById(id: string) {
        return await productStore.getById(id);
    }

    async create(sellerId: string, body: any) {
        const seller = await userStore.getById(sellerId);
        if(!seller) {
            throw unauthorized(`User with id: ${sellerId} not found.`);
        }
        const product: ProductCreateDTO = { ...body, seller: sellerId };
        const newProduct = await productStore.create(product);
        await userStore.pushProduct(sellerId, newProduct._id.toString());
        return newProduct;
    }

    async update(sellerId: string, id: string, body: ProductUpdateDTO) {
        const product = await productStore.getByIdUnpopulated(id);
        if(!product) {
            throw notFound(`Product with id: ${id} not found.`);
        }
        if(product.seller.toString() !== sellerId) {
            throw unauthorized(`User with id: ${sellerId} is not authorized to update this product.`);
        }
        return await productStore.update(id, body);
    }

    async delete(sellerId: string, id: string) {
        const product = await productStore.getByIdUnpopulated(id);
        if(!product) {
            throw notFound(`Product with id: ${id} not found.`);
        }
        if(product.seller.toString() !== sellerId) {
            throw unauthorized(`User with id: ${sellerId} is not authorized to delete this product.`);
        }
        await productStore.delete(id);
        await userStore.pullProduct(sellerId, id);
        return { message: `Product with id: ${id} deleted.` };
    }
}