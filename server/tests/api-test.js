const request = require('supertest');

describe('testing express endpoints', function () {
    var server;

    beforeEach(function () {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
    });

    afterEach(function (done) {
        server.close(done);
    });
    
    it('responds to /', function testHome (done) {
        request(server)
        .get('/')
        .expect('Content-Type', /text\/html; charset=UTF-8/)
        .expect(200, done);
    });
    
    it('responds to /about', function testAbout (done) {
        request(server)
        .get('/about')
        .expect('Content-Type', /text\/html; charset=UTF-8/)
        .expect(200, done);
    });
    
    it('responds to /help', function testHelp (done) {
        request(server)
        .get('/help')
        .expect('Content-Type', /text\/html; charset=UTF-8/)
        .expect(200, done);
    });
    
    it('responds to /search/test', function testSearch (done) {
        request(server)
        .get('/search/test')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});