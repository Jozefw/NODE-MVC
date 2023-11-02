const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, item=>{
    console.log(item)
    res.render('shop/product-detail',{product:item,pageTitle:item.title,path:'/products'})
  })
};
 
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCartContents(cart=>{
    Product.fetchAll(products=>{
      const cartContent = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id) 
        if(cartProductData){
          cartContent.push({productData: product,qty:cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartContent
      });
    })
  })
};
exports.postCart = (req, res, next) => {
  const postCartProdId = req.body.productId;
  console.log(postCartProdId);
  Product.findById(postCartProdId, product =>{
    Cart.addProduct(postCartProdId,product.price)
  });
  res.redirect('/cart')
}

exports.CartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId,product => {
    Cart.deleteCartProduct(prodId,product.price);
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
