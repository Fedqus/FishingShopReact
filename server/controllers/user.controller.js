const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

class userController {

    async registerUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }
            const { name, email, password, phone } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: 'User with this email already exists!' });
            }
            const hashPassword = await bcrypt.hash(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });

            const user = new User({
                name,
                email,
                password: hashPassword,
                phone,
                roles: [userRole.value]
            });

            await user.save();
            return res.status(201).json({ message: 'User created!', user});
        } catch (err) {
            console.log(err.message);
            res.status(400).json({ message: 'Registration error!' });
        }
    }

    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found!' });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password!' });
            }
            return res.json({ message: 'Login successes!' });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: 'Login error!' });
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await User.find({}, { __v: 0, password: 0, accessToken: 0 });
            res.json(users);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Get all users error' });
        }
    }

    /* async getUserById(req, res, next) {
        const id = req.params.id;
        try {
            const user = await User.findById(id, { __v: 0, password: 0, accessToken: 0 });
            if (!user) {
                return res.status(400).json({ message: 'User not found!' });
            }
            res.status(200).send(user);

        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: 'Get user error' });
        }
    } */

    async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            const updetes = req.body;

            if (updetes.password) {
                updetes.password = bcrypt.hashSync(updetes.password, 7);
            } const result = await User.findByIdAndUpdate(id, updetes, { new: true, runValidators: true });
            if (!result) {
                return res.status(404).json({ message: 'User not found!' });
            }
            result.save();
            res.status(200).send(result);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Update user error' });
        }
    }
}

module.exports = new userController();