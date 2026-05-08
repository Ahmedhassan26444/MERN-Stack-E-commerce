import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loader from "./components/loader"
import Header from "./components/header"
import { Toaster } from "react-hot-toast"
import { userExist, userNotExist } from "./redux/reducer/userReducer"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth/web-extension"
import { useDispatch } from "react-redux"
import { getUser } from "./redux/api/userApi"

const Home = lazy(() => import("./pages/home"))
const Cart = lazy(() => import("./pages/cart"))
const Search = lazy(() => import("./pages/search"))
const Shipping = lazy(()=> import("./pages/shipping"))
const Login = lazy(()=> import("./pages/login"))
const Order = lazy(()=> import("./pages/order"))
const OrderDetials = lazy(()=> import("./pages/order-detials"))

const Dashboard = lazy(() => import("./pages/admin/dashboard"))
const Products = lazy(() => import("./pages/admin/products"))
const Customers = lazy(() => import("./pages/admin/customers"))
const Transaction = lazy(() => import("./pages/admin/transaction"))
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"))
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"))
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"))
const Coupon = lazy(() => import("./pages/admin/apps/coupon"))
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"))
const Toss = lazy(() => import("./pages/admin/apps/toss"))
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"))
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement"))
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"))

const App = () => {
 const dispatch = useDispatch();

useEffect(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const data = await getUser(user.uid);
      dispatch(userExist(data.user));
    } else {
      dispatch(userNotExist());
    }
  });
}, [dispatch]);

  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Login />} />

          {/* logged in ueser route*/}
          <Route>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetials />} />
          </Route>
          
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/chart/bar" element={<Barcharts />} />
          <Route path="/admin/chart/pie" element={<Piecharts />} />
          <Route path="/admin/chart/line" element={<Linecharts />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/toss" element={<Toss />} />
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </Router>
  )
}

export default App