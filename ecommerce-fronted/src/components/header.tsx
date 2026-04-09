import { Link } from "react-router-dom"
import{FaSearch , FaShoppingBag,  FaSignInAlt, FaUser ,FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"
const user ={_id: "assd", role:""};
const Header = () => {
  
    const[isopen, setIsOpen] = useState<boolean>(false);
    const logouthandler = () => {
       setIsOpen(false);
    }
  
    return (
   <nav className="header">
        <Link onClick={()=>setIsOpen(false)} to="/">Home</Link>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}>
        <FaSearch />
        </Link>

        <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
        </Link>

{
    user?._id ? (
        <>
        <button onClick={()=>setIsOpen((prev)=> !prev)}>
            <FaUser />
        </button>
        <dialog open={isopen}>
            <div>
                {
                    user.role === "admin"&&(
                        <Link onClick={()=>setIsOpen(false)} to={"/admin/dashboard"}>Admin Dashboard</Link>
                    ) 
                    }
                    <Link onClick={()=>setIsOpen(false)} to="/orders">Orders</Link>
                    <button onClick={logouthandler}>
                        <FaSignOutAlt />
                    </button>
            </div>
        </dialog>
        </>
    ): ( <Link to={"/login"}>
        <FaSignInAlt />
        </Link>
)}
   </nav>
  )
}

export default Header
