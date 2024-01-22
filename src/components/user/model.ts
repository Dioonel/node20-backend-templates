import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 64,
    },
    description: {
        type: String,
        required: true,
        maxLength: 256,
        default: '',
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
        default: 0,
    },
    role: {
        type: String,
        required: true,
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'product',
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

export const userModel = model('profile', userSchema);