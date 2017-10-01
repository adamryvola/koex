const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('Basic elements', () => {
    describe('Abstract class - constructor', () => {
        it('throw error on create BasicModel class instance', () => {
            const BasicModel = require('../../src/api/db/model/BasicModel');
            expect(() => {
                new BasicModel();
            }).to.throw();
        });

        it('throw error on create PublicModel class instance', () => {
            const PublicModel = require('../../src/api/db/model/PublicModel');
            expect(() => {
                new PublicModel();
            }).to.throw();
        });

        it('throw error on create BasicDao class instance', () => {
            const BasicDAO = require('../../src/api/db/dao/BasicDAO');
            expect(() => {
                new BasicDAO();
            }).to.throw();
        });

        it('throw error on create EndpointRouter class instance', () => {
            const EndpointRouter = require('../../src/api/router/EndpointRouter');
            expect(() => {
                new EndpointRouter();
            }).to.throw();
        });

        it('throw error on create CRUDRouter class instance', () => {
            const CRUDRouter = require('../../src/api/router/CRUDRouter');
            expect(() => {
                new CRUDRouter();
            }).to.throw();
        });
    });

    describe('BasicDAO Errors', () => {
        it('throw error on getById without id', () => {
            const UserDAO = require('../../src/api/db/dao/user/UserDAO');
            expect(() => {
                UserDAO.getById(null, null);
            }).to.throw();
        });

        it('throw error on create without data', () => {
            const UserDAO = require('../../src/api/db/dao/user/UserDAO');
            expect(() => {
                UserDAO.create(null, null);
            }).to.throw();
        });

        it('throw error on update without data', () => {
            const UserDAO = require('../../src/api/db/dao/user/UserDAO');
            expect(() => {
                UserDAO.update(null, null);
            }).to.throw();
        });

        it('throw error on delete without id', () => {
            const UserDAO = require('../../src/api/db/dao/user/UserDAO');
            expect(() => {
                UserDAO.remove(null, null);
            }).to.throw();
        });
    });

    describe('BasicModel Errors', () => {
        it('throw error on get table name', () => {
            const BasicModel = require('../../src/api/db/model/BasicModel');
            expect(() => {
                const tableName = BasicModel.tableName;
            }).to.throw();
        });
    });
});
