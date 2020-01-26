const fs = require("fs");
const path = require("path");

const root = require("../util/path");

const fileLoc = path.join(root, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch previous cart
    fs.readFile(fileLoc, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      let updatedProduct;
      if (cart.products !== null) {
        const existingProductIdx = cart.products.findIndex(p => p.id === id);
        const existingProduct = cart.products[existingProductIdx];

        // Analyze the cart => Fetch exisiting products
        // Add new product / increase the quantity
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIdx] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(fileLoc, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(fileLoc, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const productToDelete = updatedCart.products.find(p => +p.id === +id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productToDelete.qty;
      updatedCart.products = updatedCart.products.filter(p => +p.id !== +id);
      fs.writeFile(fileLoc, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static fetchCart(cb) {
    fs.readFile(fileLoc, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
