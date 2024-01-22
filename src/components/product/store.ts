import { badData, internal, notFound } from "@hapi/boom";

import { productModel } from "./model.js";
import { ProductCreateDTO, ProductUpdateDTO } from "./dto.js";

export class ProductStore {
    // Singleton pattern
    private static _instance: ProductStore;
    private constructor() {}
    static getInstance(): ProductStore {
        if (!ProductStore._instance) {
            ProductStore._instance = new ProductStore();
        }
        return ProductStore._instance;
    }


    async getAll() {
        return await productModel.find()
        .populate({ path: 'seller', select: '_id username', model: 'profile' })
        .catch((err) => {
            throw internal(`${err.message}`);
        });
    }

    async getById(id: string) {
        return await productModel.findById(id)
        .populate({ path: 'seller', select: '_id username', model: 'profile' })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Product with id: ${id} not found.`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async getByIdUnpopulated(id: string) {
        return await productModel.findById(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Product with id: ${id} not found.`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async create(product: ProductCreateDTO) {
        const newProduct = new productModel(product);
        return await newProduct.save()
        .catch((err) => {
            if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

//

    async update(id: string, product: ProductUpdateDTO) {
        return await productModel.findByIdAndUpdate(id, product, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Product with id: ${id} not found.`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async delete(id: string) {
        return await productModel.findByIdAndDelete(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Product with id: ${id} not found.`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async deleteBySeller(sellerId: string) {
        return await productModel.deleteMany({ seller: sellerId })
        .catch((err) => {
            throw internal(`${err.message}`);
        });
    }
}