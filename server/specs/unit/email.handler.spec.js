'use strict';

// #######################################
// SPECS MODULES
// #######################################

let chai 	 = require('chai'),
    sinon  = require('sinon');

chai.should();

let message = require('./stub/bounce.js');

// #######################################
// LOCAL MODULES
// #######################################

let emailService = require(`../../app/service/email.js`),
		emailHandler = require(`../../app/service/email-handler.js`);

describe('EmailHandler', () => {

	it('should render template and send email', (done) => {

		let stub = sinon.stub(emailService, 'send', () => {
			return Promise.resolve(message);
		});

		let message = {
			type : 'welcome',
			subject : 'Welcome to Gestta',
			to : ['lucas.martins@redspark.io'],
			body : {
				name : 'Lucas'
			}
		};

		emailHandler.handler(message)
			.then(() => {
				sinon.assert.calledOnce(stub);
				stub.restore();
				done();
			});
	});

});
