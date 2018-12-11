var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;
require('colors');

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]'.yellow, function() {
  // Runs before each test
  this.beforeEach(function(){
    // console.log('hi');
  })
  it('should get all lions'.green, function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      });
  });
  it('should create a lion'.bgCyan, function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'alex',
        age: 22,
        pride: 'bad guys',
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      });
  });
  it('should delete a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'test lion',
        age: 11,
        pride: 'test guys',
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var lion = resp.body;
        request(app)
          .delete('/lions/' + lion.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(lion);
            done();
          });
      });
  });
  it('should update a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'test lion',
        age: 11,
        pride: 'test guys',
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var lion = resp.body;
        request(app)
          .put('/lions/' + lion.id)
          .send({ name: 'new name' })
          .end(function(err, resp) {
            expect(resp.body.name).to.equal('new name');
            done();
          });
      });
  });
});
