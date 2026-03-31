const express = require('express');
const {login, register, updateEmail, updateName} = require('../controllers/auth.controllers.cjs');
const isUserAuthenticated = require('../middlewares/auth.middlewares.cjs');

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/update/email').post(isUserAuthenticated, updateEmail);
router.route('/update/name').post(isUserAuthenticated, updateName);

module.exports = router;