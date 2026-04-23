import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { Product } from "../models/product.js";
import { mycache } from "../app.js";

export const connectDB = (url:string) => {
  mongoose
    .connect(url, {
      dbName: "Ecommerce_24",
    })
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};


export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });

    mycache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};


export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save(); 
  }
};