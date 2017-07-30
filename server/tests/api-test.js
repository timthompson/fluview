const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

/*
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
*/
describe('tesing input processing', function() {
    var utils;
    
    beforeEach(function () {
       let Utils = require('../utils');
        utils = new Utils();
    });
    
    it('should remove all nonalpha chars', function testCleanInput () {
        var input1 = 'abc123$%*',
            input2 = '#%^abc123',
            input3 = '()^%abc123_=+',
            result = 'abc123';
        
        expect(utils.cleanInput(input1)).to.equal(result);
        expect(utils.cleanInput(input2)).to.equal(result);
        expect(utils.cleanInput(input3)).to.equal(result);
    });
    
    it('"and" and "or" should be capitalized', function testCapitalizeAndOr () {
       var input1 = 'cough or fever',
           input2 = 'sick and tired',
           input3 = 'cough or sick and tired';
        
        expect(utils.capitalizeAndOr(input1)).to.equal('cough OR fever');
        expect(utils.capitalizeAndOr(input2)).to.equal('sick AND tired');
        expect(utils.capitalizeAndOr(input3)).to.equal('cough OR sick AND tired');
    });
    
    it('spaces should be removed before and after joiners', function testStripSpacing () {
        var input1 = 'cough OR fever',
            input2 = 'sick AND tired',
            input3 = 'coughOR sick ANDtired',
            input4 = 'sore throat OR fever',
            input5 = 'feverAND sore throat',
            input6 = 'sore throat ORswollen tongue';
        
        expect(utils.stripSpacing(input1)).to.equal('coughORfever');
        expect(utils.stripSpacing(input2)).to.equal('sickANDtired');
        expect(utils.stripSpacing(input3)).to.equal('coughORsickANDtired');
        expect(utils.stripSpacing(input4)).to.equal('sore throatORfever');
        expect(utils.stripSpacing(input5)).to.equal('feverANDsore throat');
        expect(utils.stripSpacing(input6)).to.equal('sore throatORswollen tongue');
    });
    
    it('test process input', function testProcessInput () {
        var input1 = '  #$ cough or #$@#fever',
            input2 = 'sore$ throat" and #fever  ',
            input3 = 'flu or chills';
        
        expect(utils.processInput(input1)).to.equal('coughORfever');
        expect(utils.processInput(input2)).to.equal('sore throatANDfever');
        expect('fluORchills');
    })
});