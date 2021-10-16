const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({
			message: 'No token provided!',
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized',
			});
		}
		req.userID = decoded.id;
		next();
	});
};

isModerator = (req, res, next) => {
	User.findByPk(req.userID).then((user) => {
		user.getRoles().then((roles) => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'moderator') {
					next();
					return;
				}
			}

			res.status(403).send({
				message: 'Require moderator role!',
			});

			return;
		});
	});
};

isAdmin = (req, res, next) => {
	User.findByPk(req.userID).then((user) => {
		user.getRoles().then((roles) => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'admin') {
					next();
					return;
				}
			}

			res.status(403).send({
				message: 'Require admin role!',
			});

			return;
		});
	});
};

isModeratorOrAdmin = (req, res, next) => {
	User.findByPk(req.userID).then((user) => {
		user.getRoles().then((roles) => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'admin') {
					next();
					return;
				}

				if (roles[i].name === 'moderator') {
					next();
					return;
				}
			}

			res.status(403).send({
				message: 'Require moderator or admin role!',
			});

			return;
		});
	});
};

const authJWT = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
	isModerator: isModerator,
	isModeratorOrAdmin: isModeratorOrAdmin,
};

module.exports = authJWT;
