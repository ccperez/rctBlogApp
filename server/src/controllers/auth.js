import User from '../models/user';
import shortId  from 'shortid';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

require('dotenv').config();

const { JWT_SECRET } = process.env;

exports.signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({ error: 'Email is taken' });
		}

		let username = shortId.generate();
		let profile = `${process.env.CLIENT_URL}/profile/${username}`;
		const {name, email, password} = req.body;
		const signupFields = {name, email, password, profile, username};

		new User(signupFields).save((err, success) => {
			if (err) {
				return res.status(400).json({ error: err });
			}
			// res.json({ user: success });
			res.json({ message: 'Signup success! Please signin.' });
		});
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;
	// check if user exist
	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({ error: 'User with that email does not exist. Please signup.' });
		}
		// authenticate
		if (!user.authenticate(password)) {
			return res.status(400).json({ error: 'Email and password do not match.' });
		}
		// generate a token and send to client
		const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1d' });
		res.cookie('token', token, { expiresIn: '1d' });
		const { _id, username, name, email, role } = user;
		return res.json({ token, user: {_id, username, name, email, role} });
	});
};

exports.signout = (req, res) => {
		res.clearCookie('token');
		res.json({
				message: 'Signout success'
		});
};

exports.requireSignin = expressJwt({
		secret: JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
	const authUserId = req.user._id;
	User.findById({ _id: authUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}
		req.profile = user;
		next();
	});
};

exports.adminMiddleware = (req, res, next) => {
	const adminUserId = req.user._id;
	User.findById({ _id: adminUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			});
		}

		if (user.role !== 1) {
			return res.status(400).json({
				error: 'Admin resource. Access denied'
			});
		}

		req.profile = user;
		next();
	});
};