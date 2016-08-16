const { MANAGER, USER } = require('../../model/user-role.js');

let filter = (req, res, next) => {
  let user = req.user;
  let filter = {};
  let department = req.query.department;

  if (user.role === MANAGER) {
    if (department) {
      if (!canUse(department, user, res))
        return;
    } else {
      let departments = user.departments || [];
      if (departments.length > 0) {
        filter = Object.assign(filter, { 'departments._id': { $in: departments.map((o) => { return o._id; }) } });
      }
    }
  }
  if (user.role === USER) {
    if (department) {
      if (!canUse(department, user, res))
        return;
    }
    filter = Object.assign(filter, { _id: user._id });
  }
  
  req.filter = filter;

  next();
};

let canUse = (department, user, res) => {
  if (user.departments.map((o) => { return o._id.toString(); }).indexOf(department) == -1) {
    res.sendStatus(403);
    return false;
  }
  return true;
};

module.exports = filter;