const express = require("express");
const { createMeal , getMeal } = require("../controllers/mealController");

const router = express.Router();

router.get("/loadmeal/:id", getMeal);
 
router.post("/", createMeal);

module.exports = router;

