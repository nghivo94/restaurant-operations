import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getStaffAccount } from "../../reducers/staffReducer";
import Loading from "../../components/Loading";
import Avatar from "./Avatar";
import AccountInformation from "./AccountInformation";
import ContactInformation from "./ContactInformation";

const AccountPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const staffAccount = useSelector(state => state.staff.staffAccount)
    const isLoading = useSelector(state => state.staff.isLoading)
    const error = useSelector(state => state.staff.error)
    const params = useParams()

    useEffect(() => {
        dispatch(getStaffAccount({ token: user.token, username: params.username, errorTimeout: 5000 }))
    }, [])

    return (
        <div>
            <div className="pt-16">
                <div className="flex flex-col font-normal md:grid md:grid-cols-[1fr_2fr]">
                    <Avatar />
                    <div>
                        <AccountInformation />
                        <ContactInformation />
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
        </div>
    )
}

export default AccountPage