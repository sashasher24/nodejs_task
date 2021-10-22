const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const truckController = require('../controllers/truckController');
const driverMiddleware = require('../middleware/driverMiddleware');

router.post('/', driverMiddleware, truckController.addTruck);
// router.get('/', truckController)
// router.get('/;id', truckController)
// router.put('/:id', truckController)
// router.delete('/:id', truckController)
// router.post('/:id/assign', truckController)


module.exports = router;