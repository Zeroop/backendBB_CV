const register = require('../controllers/register.controller')
const test = require('../controllers/test.controller')
function route(app){
    app.get('/test',test);
    app.post('/register',register);
}

module.exports = route;