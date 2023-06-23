import User from '../models/user.model';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/failure'
}));

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.redirect('/');
});

router.post('/register', async (req, res, next) => {
    if (await User.findOne({ username: req.body.username })) {
        return res.redirect('/register/failure');
    }

    const username = req.body.username;
    await User.register(new User({
        username: username
    }), req.body.password
    );
    next();
}, passport.authenticate('local', {successRedirect: '/'}));

router.get('/user', (req, res) => {
    res.send(req.user);
});

export default router;