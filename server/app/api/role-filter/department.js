const { MANAGER, USER } = require('../../model/user-role.js');

let filter = (req, res, next) => {
  let user = req.user;
  let departments = user.departments || [];
  let filter = {};

  if (departments.length > 0 && (user.role === MANAGER || user.role === USER)) {
    filter = Object.assign(filter, { _id: { $in: departments.map((o) => { return o._id; }) } });
  }

  req.filter = filter;

  next();
};

module.exports = filter;