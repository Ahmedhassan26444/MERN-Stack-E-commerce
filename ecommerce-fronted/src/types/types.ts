export type User ={
  name:string;
  email:string;
  photo:string;
  gender:string;
  role:string;
  dob:string;
  _id:string;
}
export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
}
export type shippingInfo = {
  address: string;
  country: string;
  city: string;
  state: string;
  pincode: string;
}
export type cartItem = {
  productId: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  photo: string;
}
export type OrderItem = Omit<cartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user:{
    name:string;
    _id:string;
  };
  _id:string;
};