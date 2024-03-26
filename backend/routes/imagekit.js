const express = require('express');
const imageKitController = require('../controllers/imagekitController'); 

const router = express.Router();

router.get("/auth", imageKitController.getAuthParameters);
router.post("/postimage", imageKitController.postImage);

module.exports = router;