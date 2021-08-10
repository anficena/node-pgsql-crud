module.exports = app => {
    const posts = require("../controller/post.controller.js");

    let router = require("express").Router();

    router.post("/", posts.create);

    router.get("/", posts.findAll);

    router.get("/published", posts.findAllPublished);

    router.get("/list", posts.filterAmountData);

    router.get("/:id", posts.findOne);

    router.put("/:id", posts.update);

    router.delete("/:id", posts.delete);

    router.delete("/", posts.deleteAll)

    app.use("/api/posts", router);
}