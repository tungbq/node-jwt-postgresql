const config = require('../config/db.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	port: config.PORT,
	dialect: config.dialect,
	operatorsAliases: false,

	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize, Sequelize);
db.role = require('../models/role')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: 'user_roles',
	foreign_key: 'roleID',
	otherKey: 'userID',
});

db.user.belongsToMany(db.role, {
	through: 'user_roles',
	foreign_key: 'userID',
	otherKey: 'roleID',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
