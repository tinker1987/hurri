var mockgoose = require('mockgoose');
var mongoose = require('mongoose');

describe('Connection Tests', function () {

    var Mongoose;

    beforeEach(function(){
        Mongoose = mongoose.Mongoose;
        mongoose = new Mongoose();
        mockgoose(mongoose);
    });

	describe('Connect', function () {

		it('Should NOT return an error when connecting to Mockgoose through connect', function (done) {
	        mongoose.connect('mongodb://localhost:27017/hurri', function (err, result) {
	                (err === null).should.be.true;
	                result.should.be.ok;
	                done();
	        });
	    });

	    it('Be able to connect with just a host and database', function (done) {
            (function () {
                mongoose.connect('mongodb://localhost:27017/', 'hurri');
                done();
            }).should.not.throw();
        }); 

	});

	describe('Events', function () {

		it('Dispatch connecting event on connect', function (done) {
            var connection = mongoose.connect('mongodb://localhost:27017/hurri').connection;
            connection.on('connecting', function () {
                done();
            });
        });

	});



});