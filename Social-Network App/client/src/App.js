import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NavBar from './components/navbar/NavBar';
import LeftBar from './components/leftbar/LeftBar';
import RightBar from './components/rightbar/RightBar';


const Layout = () => {
    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex' }}>
                <LeftBar />
                <Outlet />
                <RightBar/>
            </div>
        </div>
    );
}

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="profile/:id" element={<Profile />} />
                  </Route>
                  <Route path="/register" element={<Register/> } />
                  <Route path="/login" element = {<Login/>} />
                  <Route path="/profile/:id" element={<Profile/> } />
              </Routes>
          </BrowserRouter>
      </div> 
  );
}

export default App;
