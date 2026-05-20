import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productApi"
import { toast } from "react-hot-toast";
import  { Skeleton } from "../components/loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import type { cartItem } from "../types/types";
const Home = () => {
const{ data , isLoading , isError } = useLatestProductsQuery("");
 const dispatch = useDispatch();

const addToCartHandler = (cartItem: cartItem) => {
  if (cartItem.stock < 1) return toast.error("Out of Stock");

  dispatch(addToCart(cartItem));
  toast.success("Item Added to Cart");
};
  return (
    <div className="home">
     <section></section>
     <h1>
      Latest Products
      <Link to="/search" className="findmore">More</Link>
     </h1>
    <main>
  {isLoading?<Skeleton width="80vw"/>: data?.products.map((i) =>
    <ProductCard
      key={i._id}
      productId={i._id}
      name={i.name}
      price={i.price}
      stock={i.stock}
      handler={addToCartHandler}
      photo={i.photo}
    />
  )}
</main>
    </div>
  )
}

export default Home