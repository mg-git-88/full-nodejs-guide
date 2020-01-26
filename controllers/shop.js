const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, p => {
    res.render("shop/product-detail", {
      product: p,
      pageTitle: p.title,
      path: "/product"
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      let cartProductsData = null;
      for (prod of products) {
        cartProductsData = cart.products.find(p => p.id === prod.id);
        if (cartProductsData) {
          cartProducts.push({ product: prod, qty: cartProductsData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
        cartTotalValue: cart.totalPrice
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, prod => {
    Cart.addProduct(productId, prod.price);
  });
  res.redirect("/cart");
};

exports.postDeleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
  });
};
