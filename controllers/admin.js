const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
  .save()
  .then(([rows,fieldData])=>{
    res.redirect('/')
  })
  .catch(err => { 
    console.log(err)
  });
  res.redirect('/');
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product =>{
    if(!product){
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product,
    });
  })
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  const editingProdId = req.body.productId;
  const editingTitle = req.body.title;
  const editingPrice = req.body.price;
  const editingImageUrl = req.body.imageUrl;
  const editingDescription = req.body.description;
  const updatedProduct = new Product(
    editingProdId,editingTitle,editingImageUrl,editingDescription,editingPrice,
  )
  updatedProduct.save();
  res.redirect('/admin/products')
};

exports.deleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
