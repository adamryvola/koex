require('../../src').API.DBFactory.init(__dirname + '/../../knexfile.js');
const _ = require('lodash');
const DBFactory = require('../../src').API.DBFactory;
const knex = DBFactory.knex;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/bin/server');
const should = chai.should();

chai.use(chaiHttp);

const userObject = {
    name: 'Test Testeros',
    email: 'test@mail.com',
    rawPassword: 'test123',
    accounts: [
        {
            accessToken: 'xxx',
            refreshToken: 'yyy',
            email: 'test-account@mail.com',
            provider: 'koex',
            subject: '123',
        },
    ],
};
const userObject2 = {
    name: 'Test Testeros2',
    email: 'test2@mail.com',
    rawPassword: 'test1234',
    accounts: [
        {
            accessToken: 'xxx2',
            refreshToken: 'yyy2',
            email: 'test-account2@mail.com',
            provider: 'koex2',
            subject: '1234',
        },
    ],
};
let user = null;
let response = null;

describe('CustomEntity', () => {
    before(done => {
        knex.migrate.rollback()
            .then(() => knex.migrate.latest())
            .then(() => done());
    });

    beforeEach(done => {
        knex.migrate.rollback()
            .then(() => knex.migrate.latest())
            .then(() => done());
    });

    after(done => {
        knex.migrate.rollback()
            .then(() => done());
    });

    describe('Create', () => {
        describe('Success', () => {
            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        response = res;
                        done();
                    });
            });

            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid model schema', () => {
                user = response.body;

                user.should.be.property('id');
                user.id.should.be.a('number');

                user.should.be.property('name');
                user.name.should.be.a('string');

                user.should.be.property('email');
                user.email.should.be.a('string');

                user.should.be.property('accounts');
                user.accounts.should.be.a('array');
                user.accounts[0].should.be.a('object');
            });

            it('user properties values', () => {
                user = response.body;

                user.name.should.be.eql(userObject.name);
                user.email.should.be.eql(userObject.email);

                user.accounts[0].accessToken.should.be.eql(userObject.accounts[0].accessToken);
                user.accounts[0].refreshToken.should.be.eql(userObject.accounts[0].refreshToken);
                user.accounts[0].email.should.be.eql(userObject.accounts[0].email);
                user.accounts[0].provider.should.be.eql(userObject.accounts[0].provider);
                user.accounts[0].subject.should.be.eql(userObject.accounts[0].subject);
            });
        });

        describe('Fail', () => {
            const userObject = {
                name: 'Test Testeros',
                email: 'test@mail.com',
                blbost: 'blbost123',
            };

            let response = null;

            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        response = res;
                        done();
                    });
            });

            it('status 400', () => {
                response.status.should.be.eql(400);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });
        });
    });

    describe('Get by id', () => {
        describe('Success', () => {
            let createdUserId = null;

            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        createdUserId = res.body.id;
                        chai.request(server).get('/user/' + createdUserId)
                            .end((err, res) => {
                                response = res;
                                done();
                            });
                    });
            });

            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid model schema', () => {
                user = response.body;

                user.should.be.property('id');
                user.id.should.be.a('number');

                user.should.be.property('name');
                user.name.should.be.a('string');

                user.should.be.property('email');
                user.email.should.be.a('string');

                user.should.be.property('accounts');
                user.accounts.should.be.a('array');
                user.accounts[0].should.be.a('object');
            });

            it('user properties values', () => {
                user = response.body;

                user.name.should.be.eql(userObject.name);
                user.email.should.be.eql(userObject.email);

                user.accounts[0].accessToken.should.be.eql(userObject.accounts[0].accessToken);
                user.accounts[0].refreshToken.should.be.eql(userObject.accounts[0].refreshToken);
                user.accounts[0].email.should.be.eql(userObject.accounts[0].email);
                user.accounts[0].provider.should.be.eql(userObject.accounts[0].provider);
                user.accounts[0].subject.should.be.eql(userObject.accounts[0].subject);
            });
        });

        describe('Fail - no user', () => {
            before(done => {
                chai.request(server).get('/user/1')
                    .end((err, res) => {
                        response = res;
                        done();
                    });
            });

            it('status 404', () => {
                response.status.should.be.eql(404);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });
        });

        describe('Fail - id as string', () => {
            before(done => {
                chai.request(server).get('/user/xx')
                    .end((err, res) => {
                        response = res;
                        done();
                    });
            });

            it('status 400', () => {
                response.status.should.be.eql(400);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });
        });
    });

    describe('GetAll', () => {
        before(done => {
            chai.request(server).post('/user')
                .send(userObject)
                .end((err, res) => {
                    chai.request(server).post('/user')
                        .send(userObject)
                        .end((err, res) => {
                            chai.request(server).get('/user')
                                .end((err, res) => {
                                    response = res;
                                    done();
                                });
                        });
                });
        });

        it('status 200', () => {
            response.status.should.be.eql(200);
        });

        it('body is array', () => {
            response.body.should.be.a('array');
            response.body.length.should.be.eql(2);
        });

        it('valid model schema', () => {
            const users = response.body;

            users[0].should.be.property('id');
            users[0].id.should.be.a('number');

            users[0].should.be.property('name');
            users[0].name.should.be.a('string');

            users[0].should.be.property('email');
            users[0].email.should.be.a('string');

            users[0].should.be.property('accounts');
            users[0].accounts.should.be.a('array');
            users[0].accounts[0].should.be.a('object');

            users[1].should.be.property('id');
            users[1].id.should.be.a('number');

            users[1].should.be.property('name');
            users[1].name.should.be.a('string');

            users[1].should.be.property('email');
            users[1].email.should.be.a('string');

            users[1].should.be.property('accounts');
            users[1].accounts.should.be.a('array');
            users[1].accounts[0].should.be.a('object');
        });

        it('users properties values', () => {
            const users = response.body;

            users[0].name.should.be.eql(userObject.name);
            users[0].email.should.be.eql(userObject.email);
            users[0].accounts[0].accessToken.should.be.eql(userObject.accounts[0].accessToken);
            users[0].accounts[0].refreshToken.should.be.eql(userObject.accounts[0].refreshToken);
            users[0].accounts[0].email.should.be.eql(userObject.accounts[0].email);
            users[0].accounts[0].provider.should.be.eql(userObject.accounts[0].provider);
            users[0].accounts[0].subject.should.be.eql(userObject.accounts[0].subject);

            users[1].name.should.be.eql(userObject.name);
            users[1].email.should.be.eql(userObject.email);
            users[1].accounts[0].accessToken.should.be.eql(userObject.accounts[0].accessToken);
            users[1].accounts[0].refreshToken.should.be.eql(userObject.accounts[0].refreshToken);
            users[1].accounts[0].email.should.be.eql(userObject.accounts[0].email);
            users[1].accounts[0].provider.should.be.eql(userObject.accounts[0].provider);
            users[1].accounts[0].subject.should.be.eql(userObject.accounts[0].subject);
        });
    });

    describe('Delete', () => {
        describe('Success', () => {
            let allUsers = null;

            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        chai.request(server).post('/user')
                            .send(userObject)
                            .end((err, res) => {
                                chai.request(server).delete('/user/1')
                                    .end((err, res) => {
                                        response = res;
                                        chai.request(server).get('/user')
                                            .end((err, res) => {
                                                allUsers = res.body;
                                                done();
                                            });
                                    });
                            });
                    });
            });

            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(true);
            });

            it('one is deleted', () => {
                allUsers.length.should.be.eql(1);
                allUsers[0].id.should.be.eql(2);
            });
        });

        describe('Fail - no user in db', () => {

            before(done => {
                chai.request(server).delete('/user/1')
                    .end((err, res) => {
                        response = res;
                        done();
                    });
            });

            it('status 404', () => {
                response.status.should.be.eql(404);
            });

            it('body is object', () => {
                response.body.should.be.a('object')
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });

        });

        describe('Fail - id as string', () => {
            before(done => {
                chai.request(server).delete('/user/xx')
                    .end((err, res) => {
                        response = res;
                        done();
                    });
            });

            it('status 400', () => {
                response.status.should.be.eql(400);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });

        });
    });

    describe('Update', () => {
        const userToUpdate = {
            name: 'Changed name',
            email: 'ChangedEmail@mail.com',
            accounts: [_.merge(userObject.accounts[0], {
                accessToken: 'ChangedToken',
                email: 'changedAccountEmail@mail.com'
            })],
        };


        before(done => {
            chai.request(server).post('/user')
                .send(userObject)
                .end((err, res) => {
                    const createdUser = res.body;
                    userToUpdate.accounts[0].id = createdUser.accounts[0].id;
                    chai.request(server).put(`/user/${createdUser.id}`)
                        .send(userToUpdate)
                        .end((err, res) => {
                            response = res;
                            done();
                        });
                });
        });

        describe('Success', () => {
            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid model schema', () => {
                user = response.body;

                user.should.be.property('id');
                user.id.should.be.a('number');

                user.should.be.property('name');
                user.name.should.be.a('string');

                user.should.be.property('email');
                user.email.should.be.a('string');

                user.should.be.property('accounts');
                user.accounts.should.be.a('array');
                user.accounts[0].should.be.a('object');
            });

            it('user properties values', () => {
                user = response.body;

                user.name.should.be.eql(userToUpdate.name);
                user.email.should.be.eql(userToUpdate.email);

                user.accounts[0].accessToken.should.be.eql(userToUpdate.accounts[0].accessToken);
                user.accounts[0].refreshToken.should.be.eql(userToUpdate.accounts[0].refreshToken);
                user.accounts[0].email.should.be.eql(userToUpdate.accounts[0].email);
                user.accounts[0].provider.should.be.eql(userToUpdate.accounts[0].provider);
                user.accounts[0].subject.should.be.eql(userToUpdate.accounts[0].subject);
            });
        });

        describe('Fail', () => {

        });
    });

    describe('User - email available', () => {
        describe('Success - email is not available', () => {
            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        chai.request(server).get(`/user/available?email=${userObject.email}`)
                            .send()
                            .end((err, res) => {
                                response = res;
                                done();
                            });
                    });
            });

            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('correct response value', () => {
                response.body.result.should.be.eql(false);
            });
        });

        describe('Success - email is available', () => {
            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        chai.request(server).get('/user/available?email=fake@mail.com')
                            .send()
                            .end((err, res) => {
                                response = res;
                                done();
                            });
                    });
            });

            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('correct response value', () => {
                response.body.result.should.be.eql(true);
            });
        });

        describe('Fail - req without email in query', () => {
            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        chai.request(server).get('/user/available')
                            .send()
                            .end((err, res) => {
                                response = res;
                                done();
                            });
                    });
            });

            it('status 400', () => {
                response.status.should.be.eql(400);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });
        });

        describe('Fail - req with empty email in query', () => {
            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        chai.request(server).get('/user/available?email=')
                            .send()
                            .end((err, res) => {
                                response = res;
                                done();
                            });
                    });
            });

            it('status 400', () => {
                response.status.should.be.eql(400);
            });

            it('body is object', () => {
                response.body.should.be.a('object');
            });

            it('valid response', () => {
                response.body.should.be.property('success');
                response.body.success.should.be.a('boolean');
                response.body.success.should.be.eql(false);

                response.body.should.be.property('error');
                response.body.error.should.be.a('string');
            });
        });
    });

    /*
    describe('Filter', () => {
        describe('Success', () => {
            before(done => {
                chai.request(server).post('/user')
                    .send(userObject)
                    .end((err, res) => {
                        chai.request(server).post('/user')
                            .send(userObject2)
                            .end((err, res) => {
                                const filter = [
                                    {
                                        column: 'email',
                                        value: userObject2.email,
                                    },
                                ];
                                chai.request(server).get('/user/search?filter='+filter.toString())
                                    .end((err, res) => {
                                        response = res;
                                        done();
                                    });
                            });
                    });
            });

            it('status 200', () => {
                response.status.should.be.eql(200);
            });

            it('body is object', () => {
                response.body.should.be.a('array');
            });

        });
    });
    */
});
