const express = require('express');
const catchErrors = require('express-catch-errors');

const {
  create,
  remove,
  list,
  update,
  view,
} = require('../controllers/users');

const router = express.Router();

router
  .route('/')
  .get(catchErrors(list))
  .post(create);

router
  .route('/:id')
  .get(view)
  .put(update)
  .delete(remove);

// router.post('/login', (req, res) => login(req, res));

module.exports = router;
