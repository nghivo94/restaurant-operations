import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter ,Routes, Route, Link, redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ManagerMode from "./pages/ManagerMode/ManagerMode"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useEffect } from "react";

import loginService from "./services/login"
import { setUser } from "./reducers/userReducer";
import { startLoading, stopLoading } from "./reducers/loadingReducer"
import Loading from "./components/Loading";

const App = () => {
    const user = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)

    const dispatch = useDispatch()
    useEffect(() => {
        const token = window.localStorage.getItem('loggedInToken')
        const fetchUser = async () => {
            try {
                const user = await loginService.loginFromToken(token);
                dispatch(setUser(user))
            } catch (error) {
                window.localStorage.removeItem('loggedInToken')
            }
            return user
        }
        if (token) {
            dispatch(startLoading())
            fetchUser()
            dispatch(stopLoading())
        }
    }, [dispatch, user])
    return (
        <div className="App">
        {!user.firstName && <LoginForm />}
        {user.firstName && 
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/manager-mode' element={< ManagerMode />}></Route>
            </Routes>
        </BrowserRouter>
        }
        {loading && <Loading />}
    </div>
  )
}

export default App;
