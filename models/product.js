const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    }

    static fetchAll(id) {
      return db.execute('SELECT * FROM products')
    }

    static deleteById(id) {

    }

    static getById(id) {

    }

    save(){

    }

  }