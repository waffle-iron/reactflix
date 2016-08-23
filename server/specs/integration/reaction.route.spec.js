'use strict';

require('chai').should();

// #######################################
// SPECS MODULES
// #######################################

let request = require('supertest');

// #######################################
// NPM MODULES
// #######################################

let moment = require('moment');

// #######################################
// LOCAL MODULES
// #######################################

let app = require('../../config/express'),
  authenticate = require('../test/authenticate.js');

//let LOGGER = require('../../config/logger');

let Scenario = require('../builders/builder.js'),
  JsonAssert = require('../builders/assert.js');

// #######################################
// TESTS
// #######################################

describe('Reaction', () => {

  beforeEach((done) => {
    Scenario.clearDB().then(done);
  });

  describe('listing', () => {

    it('default paged default ordered', () => {

			const fullerHouseId = 80014893;

      let scenario = new Scenario(),
					lucas 	 = scenario.user('lucas'),
					carlos   = scenario.user('carlos', '123e4567-e89b-12d3-a456-426655440000'),
					reaction1	 = scenario.reaction('Omg, look that!', fullerHouseId, 0, 1, 25, carlos),
					reaction2	 = scenario.reaction('Amazing, HAHAHA!', fullerHouseId, 0, 3, 47, carlos),
					reaction3	 = scenario.reaction('wtf!', fullerHouseId, 0, 10, 25, carlos);

      return scenario.build()
        .then(() => {

          return request(app)
            .get(`/video/${fullerHouseId}/reaction`)
            .query({ time : "00:00:00" })
            .set('Authorization', authenticate(app, lucas))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {

							console.log(res.body);

              // res.body.total.should.equal(3);
              // res.body.docs.should.have.length(2);

              new JsonAssert(res.body.docs)
                .equals('$.._id' , [reaction1._id.toString(), reaction2._id.toString()])
								.equals('$..text', ['Omg, look that!', 'Amazing, HAHAHA!', 'wtf!'])
								.equals('$..time', ['00:01:25', '00:03:47'])
								.equals('$..facebookUserId', [carlos._id.toString()]);
                
            });

        }).then(() => {

          // return request(app)
          //   .get('/notification')
          //   .query({ page: 2, limit: 5 })
          //   .set('Authorization', authenticate(app, lucas))
          //   .expect(200)
          //   .expect('Content-Type', /json/)
          //   .expect((res) => {
          //     res.body.total.should.equal(6);
          //     res.body.docs.should.have.length(1);

          //     new JsonAssert(res.body.docs, { wrap : false })
          //       .equals('$.._id', n6._id.toString())
          //       .equals('$..type', 'MENTION')
          //       .equals('$..task', task1._id.toString())
          //       .equals('$..createdBy', carlos._id.toString());
            });
        });

    });
	})
});

