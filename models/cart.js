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
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(fileLoc, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
