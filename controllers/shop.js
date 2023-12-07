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
req.user
.getCart()
.then(cartContents =>{
  return cartContents
  .getProducts()
  .then(cartProducts =>{
    res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products:cartProducts
          });
  })
  .catch(err=>{
    console.log(err)
  })
})
.catch((err) =>{
  console.log(err)
})
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let returnedCart;
  req.user
    .getCart()
    .then((cart)=>{
      returnedCart = cart
      return cart.getProducts({where:{id:prodId}})
    })
    .then(products =>{
      let product;
      // if we do have products
      if(products.length > 0){
        product = products[0]
      }
      let newQty = 1;
      if(product){
        // if product exists ad to the qty
        const prevQuantity = product.cartItem.quantity;
        newQty = prevQuantity + 1;
        return returnedCart.addProduct(product,{through:{quantity:newQty}})
      }
      // if there is no product
      return Product.findByPk(prodId)
      .then((product)=>{
        return returnedCart.addProduct(product,{through:{quantity:newQty}})
      })
      .catch((err)=>{console.log(err)})
    })
    .then(products =>{
      res.redirect('/cart')
    })
    .catch(err=>{console.log(err)})
}

exports.CartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  req.user.getCart()
    .then((cartItems)=>{
      return cartItems.getProducts({where:{id:prodId}})
    })
    .then((products)=>{
      console.log(products)
      product = products[0]
      product.cartItem.destroy();
    })
    .then(()=>{
      res.redirect('/cart')
    })
    .catch(err=>{
      console.log(err())
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
