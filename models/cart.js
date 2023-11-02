const fs = require('fs');
const path = require('path');

const cartFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
    static addProduct(id,prodPrice){
        //fetch prev cart
        fs.readFile(cartFile, (err,fileContent ) => {
            let cart = { products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // check cart for the current existing product 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // add new product and increase qty 
            if (existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id, qty: 1}
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +prodPrice;
            fs.writeFile(cartFile,JSON.stringify(cart),err =>{
            })
        })

    }

    static deleteCartProduct(id,productPrice){
        fs.readFile(cartFile,(err,fileContent ) => {
            if(err){
                return;
            }
            const updatedCart = {... JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product.js){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - product.price * productQty;
            fs.writeFile(cartFile,JSON.stringify(updatedCart),err =>{
            })
            })
    }

    static getCartContents(cb){
        fs.readFile(cartFile,(err,fileContent ) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null)
            }else{
               cb(cart)
            }
        })
    }
}