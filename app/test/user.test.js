// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

// Load the server for testing
let server = require('../../index');

chai.use(chaiHttp);

//Our parent block
describe('User', () => {
	/*
	 * Test the /POST /api/test/all route
	 */
	describe('/GET /api/test/all', () => {
		it('it should get moderator content', (done) => {
			chai
				.request(server)
				.get('/api/test/all')
				.end((err, res) => {
					res.should.have.status(200);
					console.log(res.body);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Public content!');
					done();
				});
		});
	});

	/*
	 * Test the /POST /api/test/user route
	 */
	describe('/GET /api/test/user', () => {
		it('it should get user content', (done) => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM0MzgwNDk0LCJleHAiOjE2MzQ0NjY4OTR9.1Af4IVakznukFr0NH4Gc-e1C8v1XTSYh0y6oOHCBSV4';

			chai
				.request(server)
				.get('/api/test/user')
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					console.log(res.body);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('User content!');
					done();
				});
		});
	});

	/*
	 * Test the /POST /api/test/moderator route
	 */
	describe('/GET /api/test/mod', () => {
		it('it should get moderator content', (done) => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM0MzgwNDk0LCJleHAiOjE2MzQ0NjY4OTR9.1Af4IVakznukFr0NH4Gc-e1C8v1XTSYh0y6oOHCBSV4';

			chai
				.request(server)
				.get('/api/test/mod')
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					console.log(res.body);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Moderator content!');
					done();
				});
		});
	});

	/*
	 * Test the /POST /api/test/admin route
	 */
	describe('/GET /api/test/admin', () => {
		it('it should get admin content', (done) => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM0MzgwNDk0LCJleHAiOjE2MzQ0NjY4OTR9.1Af4IVakznukFr0NH4Gc-e1C8v1XTSYh0y6oOHCBSV4';

			chai
				.request(server)
				.get('/api/test/admin')
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(403);
					console.log(res.body);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Require admin role!');
					done();
				});
		});
	});
});
