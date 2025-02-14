const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./backend/routes/questionRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// اتصال به دیتابیس
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// مسیرهای API
app.use("/api/questions", questionRoutes);

// سرو کردن فرانت‌اند (اگر روی سرور اجرا شود)
app.use(express.static(path.join(__dirname, "/frontend")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port $ { PORT }));