import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ManagerPage from "./pages/ManagerMode/ManagerPage"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useEffect } from "react";

import { fetchUser } from "./reducers/userReducer";
import Loading from "./components/Loading";
import AccountPage from "./pages/AccountDetails/AccountPage";

const App = () => {
    const user = useSelector(state => state.user.user)
    const isLoading = useSelector(state => state.user.isLoading)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUser())
    },[])
    
    return (
        <div className="App">
        {!user && <LoginForm />}
        {user && 
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/details/:username' element={<AccountPage />}></Route>
                <Route path='/manager-mode' element={< ManagerPage />}></Route>
            </Routes>
        </BrowserRouter>
        }
        {isLoading && <Loading />}
    </div>
  )
}

export default App;
