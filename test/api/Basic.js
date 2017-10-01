const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('Basic elements', function () {
    describe('Abstract class - constructor', () => {
        it('throw error on create BasicModel class instance', () => {
            const BasicModel = require('../../src/api/db/model/BasicModel');
            expect(() => {
                new BasicModel();
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
});