import { Router } from 'express';
import passport from 'passport';
import { internal } from '@hapi/boom';

import { ProductService } from './service.js';
import { ProductCreateSchema, ProductUpdateSchema, IdSchema } from './dto.js';
import { joiValidator } from './../../middlewares/joi.validator.js';
import { checkRoles } from './../../middlewares/role.handler.js';

const router = Router();
const service = ProductService.getInstance();

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

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['customer', 'admin']),
    joiValidator(ProductCreateSchema, 'body'),
    async (req, res, next) => {
        try {
            if(req.user && req.user['sub']) {
                console.log(req.body);
                const response = await service.create(req.user['sub'], req.body);
                res.json(response);
            }
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['customer', 'admin']),
    joiValidator(IdSchema, 'params'),
    joiValidator(ProductUpdateSchema, 'body'),
    async (req, res, next) => {
        try {
            if(req.user && req.user['sub']) {
                console.log(req.user['sub'], req.body);
                const response = await service.update(req.user['sub'], req.params.id, req.body);
                res.json(response);
            } else {
                throw internal('User not found');
            }
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['customer', 'admin']),
    joiValidator(IdSchema, 'params'),
    async (req, res, next) => {
        try {
            if(req.user && req.user['sub']) {
                const response = await service.delete(req.user['sub'], req.params.id);
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