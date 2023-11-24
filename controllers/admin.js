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
  req.user.createProduct({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description,
    userId:req.user.id
  })
  .then((results) => {
    console.log(results)
    res.redirect('/admin/products')
  }).catch((err) => {
    console.log(err)
  })
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({where:{id:prodId}})
  .then((products) => {
    product = products[0];
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
  .catch((err)=>{
    console.log(err)
  })
}
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });

  })
  .catch((err)=>{
    console.log(err)
  })
};
exports.postEditProduct = (req, res, next) => {
  const editingProdId = req.body.productId;
  const editingTitle = req.body.title;
  const editingPrice = req.body.price;
  const editingImageUrl = req.body.imageUrl;
  const editingDescription = req.body.description;
  Product.findByPk(editingProdId)
  .then(product => {
    product.title = editingTitle;
    product.price = editingPrice;
    product.imageUrl = editingImageUrl;
    product.description = editingDescription;
    // sequelize .save() function to save back to sql db that returns a promise
    return product.save();
  })
  .then(savedResult => {
    console.log("Updated Success")
    res.redirect('/admin/products')
  })
  .catch((err)=>{
    console.log(err)
  })
};

exports.deleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then((product)=>{
    return product.destroy()
  })
  .then(()=>{
    console.log("Item Deleted")
    res.redirect('/admin/products');
  })
  .catch((err)=>{
    console.log(err)
  });
};
