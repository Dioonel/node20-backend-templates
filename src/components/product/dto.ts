import joi from 'joi';

interface Seller {
    id: string;
    username: string;
}

export interface Product {
    id: string;
    product: string;
    price: number;
    seller: string | Seller;
    created_at: Date;
}

export interface ProductCreateDTO extends Omit<Product, 'id' | 'created_at'> {
    seller: string;
}
export interface ProductUpdateDTO extends Partial<ProductCreateDTO> {}


export const ProductCreateSchema = joi.object({
    product: joi.string().min(1).max(64).required(),
    price: joi.number().min(0).required(),
});

export const ProductUpdateSchema = joi.object({
    product: joi.string().min(1).max(64),
    price: joi.number().min(0),
});

export const IdSchema = joi.object({
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});