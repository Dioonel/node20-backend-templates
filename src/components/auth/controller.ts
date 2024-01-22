import { Router } from 'express';
import passport from 'passport';

import { AuthService } from './service.js';
import { joiValidator } from '../../middlewares/joi.validator.js';
import { LoginJoi, ChangePasswordJoi } from './dto.js';

const router = Router();
const service = AuthService.getInstance();

router.post('/login',
    joiValidator(LoginJoi, 'body'),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try{
            const token = await service.signToken(req.user);
            res.json({
                user: req.user,
                token: token,
            });
        } catch (err) {
            next(err);
        }
    }
);

export default router;