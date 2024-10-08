const User = require('../models/User.model');
const Role = require('../models/Role.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;

const generateAccessToken = (roles, name, phone, email) => {
    const payload = {
        roles,
        name,
        phone,
        email
    };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};

const { validationResult } = require('express-validator');

class UserController {

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
            return res.status(201).json({ message: 'Registration success!'});
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

            const token = generateAccessToken(user.roles, user.name, user.phone, user.email);

            return res.status(201).json({ message: 'Login success!', token });
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

    async getUserById(req, res, next) {
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
    }

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

module.exports = new UserController();