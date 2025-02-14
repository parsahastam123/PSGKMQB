const fs = require("fs");
const path = require("path");
const Question = require("../models/questionModel");

// آپلود فایل
exports.uploadQuestion = async(req, res) => {
    const { category } = req.body;
    const { file } = req;

    if (!file) return res.status(400).json({ message: "فایلی انتخاب نشده است" });

    const newQuestion = new Question({
        filename: file.originalname,
        path: file.path,
        category: category,
    });

    await newQuestion.save();
    res.status(200).json({ message: "فایل با موفقیت آپلود شد" });
};

// دانلود فایل
exports.downloadQuestion = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename);
    res.download(filePath);
};

// حذف فایل
exports.deleteQuestion = async(req, res) => {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "سوال یافت نشد" });

    const filePath = path.join(__dirname, "../uploads", question.filename);
    fs.unlinkSync(filePath);

    await Question.findByIdAndDelete(id);
    res.json({ message: "سوال با موفقیت حذف شد" });
};