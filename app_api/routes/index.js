const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router.get('/test', (req, res) => {
    res.json({ message: 'API routes are working' });
});

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authController.authenticateJWT, authController.requireAdmin, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authController.authenticateJWT, authController.requireAdmin, tripsController.tripsUpdateTrip);

router
    .route('/reports/trips-by-resort')
    .get(authController.authenticateJWT, tripsController.tripsByResort);

module.exports = router;