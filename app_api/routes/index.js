const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

router.get("/test", (req, res) => {
  res.json({ message: "API routes are working" });
});

router.route("/login").post(authController.login);

// GET + POST /api/trips
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

// GET + PUT /api/trips/:tripCode
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);


module.exports = router;