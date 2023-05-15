import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { useState } from "react"
import { removeUser } from "../reducers/userReducer"

const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [menuVisible, setMenuVisible] = useState(false)
    const nagivate = useNavigate()
    const handleLogout = () => {
        if (window.confirm('Logout of current staff account?')) {
            window.localStorage.removeItem('loggedInToken')
            dispatch(removeUser())
            nagivate("/")
        }
    }

    return (
        <div>
            <div className="absolute w-screen h-16 bg-black flex flex-row justify-between items-center">
                <Link to={'/'}>
                    <div className="font-normal text-white text-2xl ml-10">LOGO</div>
                </Link>
                <div className="flex flex-row justify-end h-full w-fit items-center">
                    <div className="font-normal italic text-white text-3xl mr-16">Hi, {user.firstName}!</div>
                    {!user.image && <FaUserCircle className="text-white text-4xl mr-2"/> }
                    {menuVisible 
                        ? <IoMdArrowDropup onClick={() => setMenuVisible(false)} className="text-white text-2xl mr-2" />
                        : <IoMdArrowDropdown onClick={() => setMenuVisible(true)} className="text-white text-2xl mr-2" />}
                </div>
                
            </div>
            <div 
                style={{ display: menuVisible ? 'flex' :'none' }} 
                className="bg-white shadow-black shadow-sm h-fit w-fit
                fixed right-0 top-16 font-normal text-xl py-2
                flex flex-col items-center"
                onClick={() => setMenuVisible(false)}>
                <Link to={`/details/${user.username}`} className="w-full">
                <div className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Account Details</div>
                </Link>
                <div onClick={handleLogout}className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Logout</div>
                <hr className="border-gray-400 mx-2 my-3 w-40"></hr>
                <div className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Help</div>
                <div className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Contact</div>
                {user.isManager && 
                <div className="w-fit h-fit">
                    <hr className="border-gray-400 mx-2 my-3 w-40"></hr>
                    <Link to={"/manager-mode"} >
                    <div className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Manager mode</div>
                    </Link>
                </div>}
                
            </div>
        </div>
    )
}

export default Navbar