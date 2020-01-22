const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/product-list"
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add New Product",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
