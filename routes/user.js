const router = require('express/index').Router();

const AUTHContorller = require('../controllers/auth/user-auth');
const USERController = require('../controllers/user/user');
const PWDController = require('../controllers/password/password');

const isAuth = require('../middleware/is-auth');

router.post('/auth/login', AUTHContorller.Login); 

router.post('/auth/register', AUTHContorller.Register);

router.put('/password/update', isAuth, PWDController.Update);

router.post('/password/key', PWDController.Generate);

router.post('/password/reset', PWDController.Reset);

router.get('/all', isAuth, USERController.GetAll);

router.post('/delete', isAuth, USERController.Delete);

router.put('/update', isAuth, USERController.Update);

router.get('/role', isAuth, USERController.GetRole);

module.exports = router;