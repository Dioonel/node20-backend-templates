import { Router } from 'express';
import passport from 'passport';
import { internal } from '@hapi/boom';

import { UserService } from './service.js';
import { UserCreateSchema, UserUpdateSchema, IdSchema } from './dto.js';
import { joiValidator } from './../../middlewares/joi.validator.js';

const router = Router();
const service = UserService.getInstance();

router.get('/',
    async (req, res, next) => {
        try{
            const response = await service.getAll();
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    joiValidator(IdSchema, 'params'),
    async (req, res, next) => {
        try {
            console.log(req.params.id);
            const response = await service.getById(req.params.id);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/register',
    joiValidator(UserCreateSchema, 'body'),
    async (req, res, next) => {
        try {
            console.log(req.body);
            const response = await service.create(req.body);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
);

router.put('/',
    passport.authenticate('jwt', { session: false }),
    joiValidator(UserUpdateSchema, 'body'),
    async (req, res, next) => {
        try {
            if(req.user && req.user['sub']) {
                console.log(req.user['sub'], req.body);
                const response = await service.update(req.user['sub'], req.body);
                res.json(response);
            } else {
                throw internal('User not found');
            }
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/', 
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            if(req.user && req.user['sub']) {
                const response = await service.delete(req.user['sub']);
                res.json(response);
            } else {
                throw internal('User not found');
            }
        } catch (err) {
            next(err);
        }
    }
);


export default router;