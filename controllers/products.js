const products = [];

exports.getAllProducts = (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add New Product",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};
