const router = require('express/index').Router();
const isAuth = require('../middleware/is-auth');

// Auth
const { Login } = require('../controllers/auth/login/login');
const { Register } = require('../controllers/auth/register/register');

// User
const { Update: UpdateUser } = require('../controllers/user/edit/update-user');
const { GetRole } = require('../controllers/user/user-role');
const { GetAll } = require('../controllers/user/get-all');
const { Delete } = require('../controllers/user/delete-user');

// Pwd
const { Update: UpdatePWD } = require('../controllers/password/update');
const { Generate } = require('../controllers/password/generate');
const { Reset } = require('../controllers/password/reset');

router.post('/auth/login', Login); 

router.post('/auth/register', Register);

router.put('/password/update', isAuth, UpdatePWD);

router.post('/password/key', Generate);

router.post('/password/reset', Reset);

router.get('/all', isAuth, GetAll);

router.post('/delete', isAuth, Delete);

router.put('/update', isAuth, UpdateUser);

router.get('/role', isAuth, GetRole);

module.exports = router;