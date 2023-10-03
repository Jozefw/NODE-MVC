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
        fs.readFile(cartFile,(err,fileContent ) => {
            let cart = {products:[],totalPrice:0};
            if(!err){
                cart = JSON.parse(fileContent);
                console.log('cart content', JSON.parse(fileContent));
            }
            // check cart for the current existing product 
            
            const currentProductIndex = cart.products.findIndex(item => item.id === id);
            const currentProduct = cart.products[currentProductIndex];
            let updatedProduct;
            // add new product and increase qty 
            if (currentProduct){
                updatedProduct = {...currentProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[currentProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id, qty:1}
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + (+prodPrice);
            fs.writeFile(cartFile,JSON.stringify(cart),err =>{
                console.log(err)
            })
        })

    }
}