const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicate = (req, res, next) => {
	// Check username
	User.findOne({
		where: {
			username: req.body.username,
		},
	}).then((user) => {
		if (user) {
			res.status(400).send({
				message: 'User is already taken!',
			});

			return;
		}

		User.findOne({
			where: {
				email: req.body.email,
			},
		}).then((user) => {
			if (user) {
				res.status(400).send({
					message: 'Email is already taken!',
				});

				return;
			}

			next();
		});
	});
};

checkRolesExisted = (req, res, next) => {
	if (req.body.roles) {
		for (let index = 0; index < array.length; index++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.status(400).send({
					message: `Role ${req.body.roles[i]} does not exist!`,
				});
				return;
			}
		}
	}
	next();
};

const verifySignUp = {
	checkDuplicate: checkDuplicate,
	verifySignUp: verifySignUp,
};

module.exports = verifySignUp;
