const fs = require("fs");
const path = require("path");

const fileLoc = require("../util/path");
const Cart = require("./cart");

const filePath = path.join(fileLoc, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIdx = products.findIndex(p => +p.id === +this.id);
        let updatedProducts = [...products];
        updatedProducts[existingProductIdx] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => +p.id === +id);
      cb(product);
    });
  }

  static delete(id) {
    getProductsFromFile(products => {
      // if(id) {
      //   const existingProductIdx = products.findIndex(p => p.id === id);
      //   let updatedProducts = [...products];
      //   updatedProducts.splice(existingProductIdx, 1);
      //   fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
      //     console.log(err);
      //   });
      // }
      const product = products.find(p => p.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        } else {
          console.log(err);
        }
      });
    });
  }
};
