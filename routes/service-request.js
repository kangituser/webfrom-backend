const router = require('express/index').Router();

const isAuth = require('../middleware/is-auth');

const { findAllOpenASR } = require('../controllers/crud/read/get-open-sr');
const { findAllClosedASR } = require('../controllers/crud/read/get-closed-sr');

const { createASRequest } = require('../controllers/crud/create/create-asr-request');
const { editASR } = require('../controllers/crud/edit/edit');
const { deleteASR } = require('../controllers/crud/delete/delete');

router.get('/all/open', isAuth, findAllOpenASR);

router.get('/all/closed', isAuth, findAllClosedASR);

router.post('/create', isAuth, createASRequest)

router.put('/edit', isAuth, editASR);

router.post('/delete',isAuth, deleteASR);

module.exports = router;