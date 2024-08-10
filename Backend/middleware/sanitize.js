const xss = require('xss');

function sanitize(req,res,next){
    for (let key in req.query) {
        req.query[key] = xss(req.query[key]);
    }
  
    for (let key in req.body) {
        req.body[key] = xss(req.body[key]);
    }

    for (let key in req.params) {
        req.params[key] = xss(req.params[key]);
    }

    next();
}

module.exports = { sanitize }