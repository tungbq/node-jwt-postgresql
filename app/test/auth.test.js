// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

// Load the server for testing
let server = require('../../index');

chai.use(chaiHttp);

// Place where database comes in
const db = require('../models');
const Role = db.role;

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

//Our parent block
describe('Auth', () => {
	before((done) => {
		//Before the test we empty the database
		// Only force for test environment
		db.sequelize.sync({ force: true }).then(() => {
			console.log('Drop and sync the DB');
			initialize();
			done();
		});
	});

	// beforeEach(() => {
	//  Action before each test! (Optional)
	// });

	/*
	 * Test the /POST signup route
	 */
	describe('/POST signup', () => {
		it('it should signup a new user', (done) => {
			let new_user = {
				username: 'test1',
				email: 'test1@example.com',
				password: '12345678',
				roles: ['moderator', 'user'],
			};
			chai
				.request(server)
				.post('/api/auth/signup')
				.send(new_user)
				.end((err, res) => {
					res.should.have.status(200);
					console.log(res.body);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have
						.property('message')
						.eql('User was register successfully!');
					done();
				});
		});
	});

	/*
	 * Test the /POST signin route
	 */
	describe('/POST signin', () => {
		it('it should signin user', (done) => {
			let new_user = {
				username: 'test1',
				password: '12345678',
			};
			chai
				.request(server)
				.post('/api/auth/signin')
				.send(new_user)
				.end((err, res) => {
					res.should.have.status(200);
					console.log(res.body);
					res.body.should.be.a('object');
					res.body.should.have.property('id');
					res.body.should.have.property('id').eql(1);

					res.body.should.have.property('username');
					res.body.should.have.property('username').eql('test1');

					res.body.should.have.property('email');
					res.body.should.have.property('email').eql('test1@example.com');

					res.body.should.have.property('roles');
					res.body.should.have
						.property('roles')
						.eql(['ROLE_USER', 'ROLE_MODERATOR']);

					res.body.should.have.property('accessToken');

					done();
				});
		});
	});
});
