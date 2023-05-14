import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { useState } from "react"

const Navbar = () => {
    const user = useSelector(state => state.user)
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <div>
            <div className="absolute w-screen h-16 bg-black flex flex-row justify-end items-center">
                <div className="font-normal italic text-white text-3xl mr-16">Hi, {user.firstName}!</div>
                {!user.image && <FaUserCircle className="text-white text-4xl mr-2"/> }
                {menuVisible 
                ? <IoMdArrowDropup onClick={() => setMenuVisible(false)} className="text-white text-2xl mr-2" />
                : <IoMdArrowDropdown onClick={() => setMenuVisible(true)} className="text-white text-2xl mr-2" />}
            </div>
            <div 
                style={{ display: menuVisible ? 'flex' :'none' }} 
                className="bg-white shadow-black shadow-sm h-fit w-fit
                fixed right-0 top-16 font-normal text-xl py-2
                flex flex-col items-center"
                onClick={() => setMenuVisible(false)}>
                <div className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Account Details</div>
                <div className="w-full py-2 pl-4 hover:bg-gray-200 transition-all ease-in-out">Logout</div>
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