const asyncHandler = require("express-async-handler");
const Article = require("../models/ArticleModel");

// {
//         id: 1,
//         title: "Article 1",
//         content: "Content 1",
//         author: "Author 1",
//         publication_date: "2021-07-01",
//         photo: "https://via.placeholder.com/150",
//       }
// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Private
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({});
  res.json(articles);
});

// get my articles
// @desc    Fetch My Article articles
// @route   GET /api/articles/my/:id
// @access  Private
const getMyArticles = asyncHandler(async (req, res) => {
  // use try catch block to handle errors
  try {
    const articles = await Article.find({ author: req.params.id });
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
// @desc    Fetch single article
// @route   GET /api/articles/:id
// @access  Private
const getArticleById = asyncHandler(async (req, res) => {
  //  use try catch block to handle errors
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      res.json(article);
    } else {
      res.status(404);
      throw new Error("Article not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create an article
// @route   POST /api/articles
// @access  Private
const createArticle = asyncHandler(async (req, res) => {
  //   use try catch block to handle errors
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publication_date: req.body.publication_date,
      photo: req.body.photo,
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private
const updateArticle = asyncHandler(async (req, res) => {
  //   use try catch block to handle errors
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      article.title = req.body.title || article.title;
      article.content = req.body.content || article.content;
      article.author = req.body.author || article.author;
      article.publication_date =
        req.body.publication_date || article.publication_date;
      article.photo = req.body.photo || article.photo;

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404);
      throw new Error("Article not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private
const deleteArticle = asyncHandler(async (req, res) => {
  //   use try catch block to handle errors
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      await Article.findByIdAndDelete(req.params.id);
      res.json({ message: "Article removed" });
    } else {
      res.status(404);
      throw new Error("Article not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getMyArticles,
};
