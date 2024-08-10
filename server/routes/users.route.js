const express = require('express');
const { check } = require('express-validator');
const router = new express.Router();
const userController = require('../controllers/User.controller');

router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);

router.post('/reg', [
    check('name', 'Name can\'t be empty!').notEmpty(),
    check('password', 'Password must be longer than 7 characters!').isLength({ min: 7 }),
    check('password', 'Password can\'t be "password"!').custom(value => value !== 'password'),
    check('email', 'Email is not valid!').isEmail(),
    check('email', 'Email can\'t be empty!').notEmpty(),
    check('phone', 'Phone number is not valid!').isMobilePhone('uk-UA'),
], userController.registerUser);

router.post('/login', userController.loginUser);

router.patch('/:id', userController.updateUser);

module.exports = router;