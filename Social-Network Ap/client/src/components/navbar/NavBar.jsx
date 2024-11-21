import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "../../context/DarkModeContext";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
    const {toggle, darkMode} = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span>DBMS</span>
                </Link>
                {/* <HomeOutlinedIcon /> */}
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
                {/* <GridViewOutlinedIcon /> */}
                {/* <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div> */}
            </div>
            <div className="right">
                {/* <PersonOutlinedIcon /> */}
                {/* <EmailOutlinedIcon /> */}
                {/* <NotificationsOutlinedIcon /> */}
                <div className="user">
                    <img src={"./uploads/"+currentUser.profilePic} alt="" onClick={()=>{navigate(`/profile/${currentUser.id}`)}}/>
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
