const express = require("express");
const router = express.Router();
const multer = require("multer");
const questionController = require("../controllers/questionController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// روت‌ها
router.post("/upload/category1", upload.single("file"), questionController.uploadQuestion);
router.get("/download/:filename", questionController.downloadQuestion);
router.delete("/questions/:id", questionController.deleteQuestion);

module.exports = router;