const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getMyArticles,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getArticles).post(protect, createArticle);
router.route("/my/:id").get(protect, getMyArticles);
router
  .route("/:id")
  .get(getArticleById)
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

module.exports = router;
