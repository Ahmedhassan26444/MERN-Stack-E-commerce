import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";

type CartItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

type CardItemProps = {
  cartItem: CartItemType;
  incrementCartHandler: (cartItem: CartItemType) => void;
  decrementCartHandler: (cartItem: CartItemType) => void;
  removeFromCartHandler: (Id: string) => void;


};

const CartItem = ({ cartItem, incrementCartHandler, decrementCartHandler, removeFromCartHandler }: CardItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
        </article>
        <div>
          <button onClick={()=>decrementCartHandler(cartItem)}>-</button>
          <p>{quantity}</p>
          <button onClick={()=>incrementCartHandler(cartItem)}>+</button>
        </div>

        <button onClick={()=>removeFromCartHandler(productId)}>
          <FaTrash />
        </button>
      
    </div>
  );
};

export default CartItem;