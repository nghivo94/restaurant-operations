import { useSelector, useDispatch } from "react-redux"
import AVATAR_PLACEHOLDER from "../../assets/avatar_placeholder.png"

const Avatar = () => {
    const dispatch = useDispatch()
    const staff = useSelector(state => state.staff.staffAccount)
    return (
        <div className="pt-20 w-full flex-grow-0 text-center">
            {staff &&
            <div>
                <label htmlFor="avatar" className="flex justify-center">
                <img src={AVATAR_PLACEHOLDER} alt="avatar" className="w-40 md:w-56"/>
                </label>
                <input id="avatar" type="file" className="hidden"/>
                <div className="text-2xl mt-6">{staff.username}</div>
            </div>
            }
        </div>
    )
}

export default Avatar