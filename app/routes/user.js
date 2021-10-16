const { authJWT } = require('../middleware');
const controller = require('../controllers/user');

module.exports = function (app) {
	app.use(function (req, res, next) {
		req.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);

		next();
	});

	app.get('/api/test/all', controller.allAccess);

	app.get(
		'/api/test/mod',
		[authJWT.verifyToken, authJWT.isModerator],
		controller.moderatorBoard
	);

	app.get(
		'/api/test/admin',
		[authJWT.verifyToken, authJWT.isAdmin],
		controller.adminBoard
	);
};
