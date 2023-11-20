const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) =>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch((err) =>{
    console.log(err)
  })
  };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then((product) =>{
    res.render('shop/product-detail',
    {
      product:product,
      pageTitle:product.title,
      path:'/products'})
  })
  .catch((err) => {
    console.log(err)
  })
   
  };
 
exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products) =>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch((err) =>{
    console.log(err)
  })
  };


exports.getCart = (req, res, next) => {
  Cart.getCartContents(cart=>{
    Product.findAll()
    .then((products) =>{
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
    .catch((err) =>{
      consol.log(err)
    })
    })
};
exports.postCart = (req, res, next) => {
  const postCartProdId = req.body.productId;
  console.log(postCartProdId);
  Product.findByPk(postCartProdId, product =>{
    Cart.addProduct(postCartProdId,product.price)
  });
  res.redirect('/cart')
}

exports.CartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findByPk(prodId,product => {
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
