const router = require('express/index').Router();

const SRController = require('../controllers/crud/crud-service-request');
const isAuth = require('../middleware/is-auth');

router.get('/all/open', isAuth, SRController.GetOpenASRs);

router.get('/all/closed', isAuth, SRController.GetClosedASRs);

router.post('/create', isAuth, SRController.createASR)

router.put('/edit', isAuth, SRController.editASR);

router.post('/delete',isAuth, SRController.deleteASR);

module.exports = router;