import { Router } from 'express';

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

router.put('/:id', 
    joiValidator(IdSchema, 'params'),
    joiValidator(UserUpdateSchema, 'body'),
    async (req, res, next) => {
        try {
            console.log(req.params.id, req.body);
            const response = await service.update(req.params.id, req.body);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id', 
    joiValidator(IdSchema, 'params'),
    async (req, res, next) => {
        try {
            console.log(req.params.id);
            const response = await service.delete(req.params.id);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
);


export default router;