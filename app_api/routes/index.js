const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router.get("/test", (req, res) => {
  res.json({ message: "API routes are working" });
});

// GET + POST /api/trips
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

// GET + PUT /api/trips/:tripCode
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;