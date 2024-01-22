import joi from 'joi';

export const LoginJoi = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
});

export const ChangePasswordJoi = joi.object({
    newPassword: joi.string().min(5).required(),
});