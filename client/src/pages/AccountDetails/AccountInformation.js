import { useSelector, useDispatch } from "react-redux"

const AccountInformation = () => {
    const staff = useSelector(state => state.staff.staffAccount)
    return (
        <div className="flex-grow-1 lg:mr-20 mt-20 mr-10 ml-10 md:ml-0">
            {staff && 
            <div className="border-amber-600 border-solid border-2 flex flex-col">
                <div className="text-white bg-amber-600 text-2xl px-10 py-2">Account Information</div>
                <div className="grid grid-cols-[100px_auto] md:grid-cols-[200px_auto] px-5 md:px-10 pt-8 text-sm md:text-base">
                    <div className="font-bold py-1">Username</div>
                    <input 
                        className=" bg-gray-100 px-2 py-1 truncate" 
                        disabled={true}
                        type="text" value={staff.username}/>
                    <div className="font-bold py-1 truncate">Authorization</div>
                    <input 
                        className=" bg-gray-100 px-2 py-1 truncate" 
                        disabled={true}
                        type="text" value={staff.isManager ? "Manager" : "Staff"}/>
                </div>
                <div className="w-full flex justify-end">
                    <button className="text-amber-600 mr-6 mb-2 italic text-xl">Change password{">>"}
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default AccountInformation