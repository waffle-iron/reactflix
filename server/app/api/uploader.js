'use strict';

let api = (app) => {
  
  app.get('/video/:movieId/reaction', (req, res) => {

    let movieId = req.query.movieId;
    let time    = req.query.time;

    res.send({ userId : req.user._id, movieId, time});
  });
}

module.exports = api;