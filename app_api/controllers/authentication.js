const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'All fields required' });
        }
        const existing = await User.findOne({ email: req.body.email }).exec();
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role === 'admin' ? 'admin' : 'customer'
        });
        user.setPassword(req.body.password);
        await user.save();
        return res.status(201).json({ token: user.generateJWT() });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'All fields required' });
        }
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user || !user.validPassword(req.body.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        return res.status(200).json({ token: user.generateJWT() });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const authenticateJWT = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        req.auth = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const requireAdmin = (req, res, next) => {
    if (!req.auth || req.auth.role !== 'admin') {
        return res.status(403).json({ message: 'Admin role required' });
    }
    return next();
};

module.exports = { register, login, authenticateJWT, requireAdmin };