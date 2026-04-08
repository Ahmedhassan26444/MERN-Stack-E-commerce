import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
const Home = () => {

  const AddToCardHandler = () => {

  }
  return (
    <div className="home">
     <section></section>
     <h1>
      Latest Products
      <Link to="/search" className="findmore">More</Link>
     </h1>
     <main>
      <ProductCard  
      productId="assd"
       name="Mackbook"
        price={1223} 
        stock={1245}
        handler = {AddToCardHandler}
        photo = "https://m.media-amazon.com/images/I/71TPda7cwUL._SX522_.jpg" />
     </main>
    </div>
  )
}

export default Home