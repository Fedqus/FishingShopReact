/* const express = require('express');
const router = express.Router();
const User = require('../models/user.model');


router.post('/reg', (req, res) => {
    const {name, surname} = req.body;

    const user = new User ({
        name,
        surname
    })
    user.save();
    return res.status(201).send({messsage:"User created"});

})

router.get('/get', async (req, res) => {
    try {
        const users = await User.find(); // Дочекатися завершення запиту
        return res.status(200).json(users); // Відправити результат у форматі JSON
    } catch (error) {
        console.error(error.message); // Логування помилок
        return res.status(500).json({ error: 'Server Error' });
    }
});


module.exports = router; */

const express = require('express');
const { check } = require('express-validator');
const router = new express.Router();
const userController = require('../controllers/user.controller');

router.get('/all', userController.getUsers);
/* router.get('/:id', userController.getUserById); */

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