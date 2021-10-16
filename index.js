const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

let corsOptions = {
	origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

//Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Place where database comes in
const db = require('./app/models');
const Role = db.role;

// Only force for dev environment
db.sequelize.sync({ force: true }).then(() => {
	console.log('Drop and sync the DB');
	initialize();
});

// Feed DB data
function initialize() {
	Role.create({
		id: 1,
		name: 'user',
	});
	Role.create({
		id: 2,
		name: 'moderator',
	});
	Role.create({
		id: 3,
		name: 'admin',
	});
}

// Basic route
app.get('/', (req, res) => {
	res.json({ message: 'Hi there!' });
});

const PORT = process.env.PORT || 1995;

// Bring up all the routes
require('./app/routes/auth')(app);
require('./app/routes/user')(app);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
