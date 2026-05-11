import { Link } from "react-router-dom"
import{FaSearch , FaShoppingBag,  FaSignInAlt, FaUser ,FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"
import type { User } from "../types/types";
import { auth } from "../firebase";
import { signOut } from "firebase/auth/cordova";
import toast from "react-hot-toast";
interface PropsType {
    user: User | null;
}
const Header = ({user}:PropsType) => {
  
    const[isopen, setIsOpen] = useState<boolean>(false);
    const logouthandler =async () => {
       try{
        await signOut(auth);
        toast.success("Signed out successfully");
       setIsOpen(false);
       } catch{
        toast.error("sign out Fail");
    }
};
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
