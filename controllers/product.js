const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Product = require("../models/Product");

// @desc    Create User
// @route   POST/api/users/
// @access   Public/Admin

exports.addProduct = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const photo = req.files.image;
  //Make sure the image is a photo
  var name = [];
  if (photo.length > 1) {
    for (var i = 0; i < photo.length; i++) {
      if (!photo[i].mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please Upload an Image`, 400));
      }
      // Check filesize
      if (photo[i].size > process.env.MAX_FILE_UPLOAD) {
        return next(
          new ErrorResponse(
            `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
            400
          )
        );
      }
      //crete custom filename
      photo[i].name = `Photo_${user._id}_${photo[i].name}${
        path.parse(photo[i].name).ext
      }`;
      photo[i].mv(
        `${process.env.FILE_UPLOAD_PATH}/${photo[i].name}`,
        async (err) => {
          if (err) {
            console.error(err);
            return next(
              new ErrorResponse(`An error occured while uploading`, 500)
            );
          }
        }
      );
      name.push(`/uploads/${photo[i].name}`);
    }
  } else {
    if (!photo.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please Upload an Image`, 400));
    }
    // Check filesize
    if (photo.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
    //crete custom filename
    photo.name = `Photo_${user._id}_${photo.name}${path.parse(photo.name).ext}`;
    photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`An error occured while uploading`, 500));
      }
    });
    name.push(`/uploads/${photo.name}`);
  }

  req.body.user = user;
  req.body.image = name;

  const products = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: products,
  });
});

// @desc    get Products
// @route   POST/api/users/
// @access   Public/Admin
exports.getProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { name, price, description, brand, category, countInStock, oldPhoto } =
    req.body;

  const photo = req.files ? req.files.image : [];

  //Make sure the image is a photo
  var names = JSON.parse(oldPhoto);

  if (photo.length > 1) {
    for (var i = 0; i < photo.length; i++) {
      if (!photo[i].mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please Upload an Image`, 400));
      }
      // Check filesize
      if (photo[i].size > process.env.MAX_FILE_UPLOAD) {
        return next(
          new ErrorResponse(
            `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
            400
          )
        );
      }
      //crete custom filename
      photo[i].name = `Photo_${user._id}_${photo[i].name}${
        path.parse(photo[i].name).ext
      }`;
      photo[i].mv(
        `${process.env.FILE_UPLOAD_PATH}/${photo[i].name}`,
        async (err) => {
          if (err) {
            console.error(err);
            return next(
              new ErrorResponse(`An error occured while uploading`, 500)
            );
          }
        }
      );

      names.push(`/uploads/${photo[i].name}`);
    }
  } else {
    if (photo.length === 1) {
      if (!photo.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please Upload an Image`, 400));
      }
      // Check filesize
      if (photo.size > process.env.MAX_FILE_UPLOAD) {
        return next(
          new ErrorResponse(
            `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
            400
          )
        );
      }
      //crete custom filename
      photo.name = `Photo_${user._id}_${photo.name}${
        path.parse(photo.name).ext
      }`;
      photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
        if (err) {
          console.error(err);
          return next(
            new ErrorResponse(`An error occured while uploading`, 500)
          );
        }
      });
      names.push(`/uploads/${photo.name}`);
    }
  }

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = names;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
