import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
    product: {
        type: String,
        minLength: 1,
        maxLength: 64,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    seller: {
        type: Types.ObjectId,
        ref: 'profile',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

export const productModel = model('product', productSchema);