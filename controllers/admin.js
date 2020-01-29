const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add New Product",
    path: "/admin/add-product",
    editMode: false
  });
};

exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.inEdit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  // Product.findByPk(prodId)
  req.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      if (!products) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        product: products[0],
        editMode: editMode
      });
    })
    .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description
    })
    .then(result => {
      console.log("Product created successfully!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      return product.save();
    })
    .then(result => {
      console.log("Product updated successfully!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({ where: { id: prodId } })
    .then(result => {
      console.log("Product deleted successfully!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
