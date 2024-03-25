const express = require("express");
const { createMeal , getMeal } = require("../controllers/mealController");

const router = express.Router();

router.get("/loadmeal/:id", getMeal);
 
router.post("/savemeal", createMeal);

module.exports = router;

