const express = require("express");
const router = express.Router();

const postsRouter = require("./post");
const commentsRouter = require("./comment");
const indexRouter = require("./index");
const authRouter = require("./auth");

router.use("/api", [postsRouter, commentsRouter, indexRouter, authRouter]);

router.get("/index", async (req, res) => {
    res.status(200).json({ message: "인덱스 페이지" });
  });

module.exports = router;