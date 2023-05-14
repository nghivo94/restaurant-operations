import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"

const Navbar = () => {
    const user = useSelector(state => state.user)
    return (
        <div className="absolute w-screen h-20 bg-black flex flex-row justify-end items-center">
            <FaUserCircle className="text-white text-6xl"/>
        </div>
    )
}

export default Navbar