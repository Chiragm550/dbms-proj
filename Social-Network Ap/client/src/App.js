import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NavBar from './components/navbar/NavBar';
import LeftBar from './components/leftbar/LeftBar';
import RightBar from './components/rightbar/RightBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { DarkModeContext } from './context/DarkModeContext';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

function App() {

    const { currentUser } = useContext(AuthContext);
    const { darkMode } = useContext(DarkModeContext)
    
    const queryClient = new QueryClient()   

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <NavBar />
                    <div style={{display: "flex"}}>
                        {/* <LeftBar />  */}
                        <div style={{flex: 6}}>
                            <Outlet />
                        </div>
                        <RightBar />
                    </div>
                </div>
            </QueryClientProvider>
        );
    }
    
    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login"/>
        }
        else {
            return children
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route index element={<Home />} />
                        <Route path="profile/:id" element={<Profile />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
