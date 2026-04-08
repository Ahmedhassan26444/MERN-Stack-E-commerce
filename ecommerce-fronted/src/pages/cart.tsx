import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/Cart-item"; // apna sahi path likho
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "asdasdasd",
    photo: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX522_.jpg",
    name: "Macbook",
    price: 3000,
    quantity: 4,
    stock: 10,
  },
];

const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges - discount;

const Cart = () => {
  const [coupenCode, setcoupenCode] = useState<string>("");
  const [isValidcoupenCode, setIsValidcoupenCode] = useState<boolean>(false);

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
          <CartItem key={idx} cartItem={i} />
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