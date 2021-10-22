const Router = require('express');
const router = new Router();
// const {check} = require('express-validator');

const loadController = require('../controllers/loadController');
const shipperMiddleware = require('../middleware/shipperMiddleware');

router.post('/', shipperMiddleware, loadController.addLoad);
// router.get('/', shipperMiddleware, loadController)
// router.get('/;id', truckController)
// router.put('/:id', truckController)
// router.delete('/:id', truckController)
// router.post('/:id/assign', truckController)


module.exports = router;