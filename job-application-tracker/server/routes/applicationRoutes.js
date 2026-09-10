const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getApplications,
  getStats,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication
} = require("../controllers/applicationController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getApplications);
router.get("/stats", getStats);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;
