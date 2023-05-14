import { useDispatch, useSelector } from "react-redux"
import BACKGROUND from '../assets/login_background.jpg'
import { BiError } from "react-icons/bi";

import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { startLoading, stopLoading } from "../reducers/loadingReducer"
import Loading from "./Loading";

const LoginForm = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const notification = useSelector(state => state.notification)
    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        dispatch(startLoading())
        try {
            const user = await loginService.loginFromCredentials({ username: username, password: password })
            dispatch(setUser(user))
            window.localStorage.setItem('loggedInToken', user.token)
        } catch (error) {
            if (error.response.data) {
                dispatch(setNotification(error.response.data.error, true, 5000))
            } else {
                dispatch(setNotification(error.message, true, 5000))
            }
        }
        dispatch(stopLoading())
    }
    const handleAlert = () => {
        window.alert('This application is for internal usage only. Please contact your manager if any problems occur with your staff account.')
    }
    const style = {
        backgroundImage: `url(${BACKGROUND})`
    }
    return (
        <div>
            <div 
                style = {style} 
                className="absolute h-screen w-screen 
                    bg-cover md:bg-right-bottom bg-bottom 
                    flex flex-row justify-center md:justify-start items-center">
                <div className='flex flex-col 
                    md:w-1/3 w-full sm:min-w-[24rem] max-w-[24rem] md:max-w-none 
                    h-4/5 max-h-[40rem]
                    md:ml-48 mx-10
                    bg-white/[.80]'>
                    <div className='font-display text-6xl text-center my-16 flex-grow-0'>Login</div>
                    {notification.message && 
                    <div 
                        className='bg-yellow-100 p-2 mb-2 border-4 border-yellow-200 border-dotted rounded-xl mx-10
                        text-lg font-normal flex flex-row items-center'><BiError size={'1.60rem'} className="mr-2"/> {notification.message}</div>
                    }
                    <form 
                        onSubmit={handleLogin} 
                        className='flex-grow flex flex-col font-normal text-xl mx-10'>
                        <div className='w-full'>
                            <input 
                                className='w-full bg-white/0 focus:outline-none focus:bg-white 
                                    border-b-2 border-black 
                                    mb-6 py-2 px-1 focus:px-2
                                    transition-all ease-in-out' 
                                name='username' 
                                type='text' 
                                placeholder='Username'
                                required/>
                        </div>
                        <div className='w-full'>
                            <input 
                                className='w-full bg-white/0 focus:outline-none focus:bg-white 
                                    border-b-2 border-black 
                                    mb-6 py-2 px-1 focus:px-2
                                    transition-all ease-in-out'
                                name='password' 
                                type='password' 
                                placeholder='Password'
                                required/>
                        </div>
                        <button 
                            type='submit' 
                            className='bg-black text-white w-full mt-10 p-3 font-bold
                                border-4 border-black
                                hover:bg-white hover:text-black
                                transition-all ease-in-out' >LOGIN</button>
                        <button className='border-none text-left italic pt-3' onClick={handleAlert}>
                            <span className='border-b-2 border-black hover:animate-pulse transition-all ease-in-out'>Troubleshooting</span>
                        </button>
                    </form>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    )
}

export default LoginForm