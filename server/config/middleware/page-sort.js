module.exports = (req, res, next) => {

  if (typeof req.query.page === 'string')
    req.query.page = parseInt(req.query.page, 10);

  if (typeof req.query.limit === 'string')
    req.query.limit = parseInt(req.query.limit, 10);

  next();
};