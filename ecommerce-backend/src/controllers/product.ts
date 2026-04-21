import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "node:fs";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("deleted");
      });
      return next(new ErrorHandler("Please enter All Fields", 400));
    }
    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  },
);

export const getlatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
  return res.status(200).json({
    success: true,
    products,
  });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.find({}).distinct("category");
  return res.status(200).json({
    success: true,
    categories,
  });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});
  return res.status(200).json({
    success: true,
    products,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler(" product not found", 404));
  return res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = TryCatch(
  async (
    req: Request<{ id: string }, {}, NewProductRequestBody>,
    res,
    next,
  ) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("invalid product id", 404));

    if (photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
      product.photo = photo.path;
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product updated Successfully",
    });
  });


  export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler(" product not found", 404));
  
  rm(product.photo!, () => {
        console.log(" Product photo deleted");
      });
  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product deleted Successfully",
  });
})
export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    
    const baseQuery: BaseQuery = {};
    if (search)
       baseQuery.name = {
       $regex: search,
       $options: "i",
  };
    if (price)
        baseQuery.price = {
        $lte: Number(price),
  };

  if (category) baseQuery.category = category;

const products = await Product.find(baseQuery).sort(
  sort && { price: sort === "asc" ? 1 : -1 } 
).limit(limit).skip(skip);
const totalPage = Math.floor(products.length / limit);

    return res.status(200).json({
      success: true,
      products,
    });
  }
);