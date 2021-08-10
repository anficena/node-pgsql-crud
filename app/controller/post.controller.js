const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can't be empty",
    });
    return;
  }

  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some erorr ocured wile creating the Post",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then((data) => res.send(setResponse(true, "List Data", data)))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => res.send(setResponse(true, "Detail Data", data)))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Post.update(req.body, { where: { id: id } })
    .then((result) => {
      if (result == 1) {
        res.send(setResponse(true, "Update successfuly!"));
      } else {
        res.send(setResponse(false, `Can't update post with id: ${id}`));
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Post.destroy({ where: { id: id } })
    .then((result) => {
      if (result == 1) {
        res.send(setResponse(true, "Delete successfuly!"));
      } else {
        res.send(setResponse(false, `Can't delete post with id: ${id}`));
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Post.destroy({ where: {}, truncate: false })
    .then((result) => {
      res.send(setResponse(false, "Delete all data successfuly!"));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAllPublished = (req, res) => {
  Post.findAll({ where: { published: true } })
    .then((data) => res.send(setResponse(true, "All published data", data)))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.filterAmountData = (req, res) => {
  const limit = req.query.limit;
  if (limit != "All") {
    Post.findAll({
      limit: parseInt(limit),
      order: [["id", "DESC"]],
    })
      .then((data) => res.send(setResponse(true, "List Data", data)))
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    this.findAll(req, res);
  }
};

const setResponse = (status, message, data) => {
  return {
    status: status,
    message: message,
    data: data || [],
  };
};
