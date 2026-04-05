const express = require('express');
const {login, register, updatePassword} = require('../controllers/auth.controllers.cjs');
const {isUserAuthenticated} = require('../middlewares/auth.middlewares.cjs');

const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/register').post(register);
// authRouter.route('/update/email').patch(isUserAuthenticated, updateEmail);
// authRouter.route('/update/name').patch(isUserAuthenticated, updateName);
authRouter.route('/update/password').patch(isUserAuthenticated, updatePassword);

module.exports = {
    authRouter
};