const express = require('express');

const { list, create, view, remove, sendPush, pushAll } = require('../controllers/device');

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(create);

router.route('/send/push').post(sendPush);
router.route('/send/pushall').post(pushAll);

router
  .route('/:id')
  .get(view)
  .delete(remove);

module.exports = router;
