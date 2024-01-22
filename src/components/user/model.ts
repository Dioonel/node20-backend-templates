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
        minLength: 1,
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
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

export const userModel = model('user', userSchema);