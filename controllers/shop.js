const Product = require("../models/product");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/product"
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products
            // cartTotalValue: cart.totalPrice
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  // Cart.fetchCart(cart => {
  //   Product.findAll()
  //     .then(products => {
  //       const cartProducts = [];
  //       let cartProductsData = null;
  //       for (prod of products) {
  //         cartProductsData = cart.products.find(p => p.id === prod.id);
  //         if (cartProductsData) {
  //           cartProducts.push({ product: prod, qty: cartProductsData.qty });
  //         }
  //       }
  //       res.render("shop/cart", {
  //         pageTitle: "Your Cart",
  //         path: "/cart",
  //         products: cartProducts,
  //         cartTotalValue: cart.totalPrice
  //       });
  //     })
  //     .catch(err => console.log(err));
  // });
};

exports.postCart = (req, res, next) => {
  let fetchedCart;
  const productId = req.body.productId;
  let newQty = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQty = product.cartItem.quantity;
        newQty = oldQty + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQty }
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postDeleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      console.log("Item in your cart deleted successfully!");
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then(orders => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        orders: orders,
        path: "/orders"
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};
