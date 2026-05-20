import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/Cart-item"; // apna sahi path likho
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { CartReducerInitialState } from "../types/reducerTypes";
import type { cartItem } from "../types/types";
import { addToCart, removeFromCart } from "../redux/reducer/cartReducer";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
  useSelector(
    (state: { cartReducer: CartReducerInitialState }) =>
      state.cartReducer
  );
  const [coupenCode, setcoupenCode] = useState<string>("");
  const [isValidcoupenCode, setIsValidcoupenCode] = useState<boolean>(false);
 const dispatch = useDispatch();
  const incrementCartHandler = (cartItem: cartItem) => {
if(cartItem.quantity >= cartItem.stock) return;
  dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
};
 const decrementCartHandler = (cartItem: cartItem) => {
if(cartItem.quantity <= 1) return;
  dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
};
 const removeFromCartHandler = (productId: string) => {
  
  dispatch(removeFromCart(productId));
};


  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidcoupenCode(true);
      else setIsValidcoupenCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setIsValidcoupenCode(false);
    };
  }, [coupenCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? cartItems.map((i, idx) => (
          <CartItem 
          incrementCartHandler={incrementCartHandler}
          decrementCartHandler={decrementCartHandler}
          removeFromCartHandler={removeFromCartHandler}
           key={idx} cartItem={i} />
        )) :<h1>No Item Added</h1>}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>Discount: <em>- ₹{discount}</em></p>
        <p><b>Total: ₹{total}</b></p>
        <input
          type="text"
          placeholder="Coupen Code"
          value={coupenCode}
          onChange={(e) => setcoupenCode(e.target.value)}
        />
        {coupenCode && (
          isValidcoupenCode
            ? <span className="green">₹{discount} off using <code>{coupenCode}</code></span>
            : <span className="red">Invalid Coupen <VscError /></span>
        )}

        {
          cartItems.length > 0 && <Link to ="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  );
};

export default Cart;