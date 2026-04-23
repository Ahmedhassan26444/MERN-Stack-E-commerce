import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "node:fs";
import { mycache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
// import { faker } from "@faker-js/faker";

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
    await invalidateCache({ product: true });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });

  },
);

export const getlatestProducts = TryCatch(async (req, res, next) => {
  let products;

  if (mycache.has("latest-products"))
    products = JSON.parse(mycache.get("latest-products") as string);
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    mycache.set("latest-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;

  if (mycache.has("categories"))
    categories = JSON.parse(mycache.get("categories") as string);
  else {
    categories = await Product.distinct("category");
    mycache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;

  if (mycache.has("all-products"))
    products = JSON.parse(mycache.get("all-products") as string);
  else {
    products = await Product.find({});
    mycache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  let product;
  const id = req.params.id;

  if (mycache.has(`product-${id}`))
    product = JSON.parse(mycache.get(`product-${id}`) as string);
  else {
    product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    mycache.set(`product-${id}`, JSON.stringify(product));
  }

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
    await invalidateCache({ product: true });
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

   const productsPromise = Product.find(baseQuery)
  .sort(sort && { price: sort === "asc" ? 1 : -1 })
  .limit(limit)
  .skip(skip);

  const [products, filteredOnlyProducts] = await Promise.all([
  productsPromise,
  Product.find(baseQuery),
]);
  
const totalPage = Math.ceil(filteredOnlyProducts.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);

 //const generateRandomProducts = async (count: number = 10) => {
  //const products: any[] = [];

  //for (let i = 0; i < count; i++) {
    //const product = {
      //name: faker.commerce.productName(),
      //photo: "uploads\\b1d956a1-6b18-4438-b688-2a6ab68c89b6.png",
      //price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
      //stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
      //category: faker.commerce.department(),
      //createdAt: new Date(faker.date.past()),
      //updatedAt: new Date(faker.date.recent()),
      //__v: 0,
    //};

   // products.push(product);
  //}

  //await Product.create(products);

  //console.log({ succecss: true });
//}; 


//const deleteRandomsProducts = async (count: number = 10) => {
  //const products = await Product.find({}).skip(2);

  //for (let i = 0; i < products.length; i++) {
    //const product = products[i];
    //await product.deleteOne();
  //}

  //console.log({ succecss: true });
//};