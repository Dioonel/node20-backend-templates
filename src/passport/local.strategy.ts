import { Strategy } from 'passport-local';
import { notFound, unauthorized } from '@hapi/boom';
import { compare } from 'bcrypt';

import { UserStore } from './../components/user/store.js';

const userStore = UserStore.getInstance();

const LocalStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try{
            let user = await userStore.getByEmail(email);
            if(!user) done(notFound('User not found'), false);
            const isMatch = await compare(password, user.password || '');
            if(!isMatch) done(unauthorized('Unauthorized'), false);
            user = user.toObject();
            delete user.password;
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
);

export default LocalStrategy;