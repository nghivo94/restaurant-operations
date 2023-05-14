import { useSelector } from "react-redux";
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ManagerMode from "./pages/ManagerMode/ManagerMode"
import Navbar from "./components/Navbar";


const App = () => {
    const user = useSelector(state => state.user)
    return (
        <div className="App">
        {!user && <LoginForm />}
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/manager-mode' element={< ManagerMode />}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default App;
