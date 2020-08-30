const express = require('express');

const { list, create, view, remove, sendPush } = require('../controllers/device');

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(create);

router.route('/send/push').post(sendPush);

router
  .route('/:id')
  .get(view)
  .delete(remove);

module.exports = router;
