import { Settings } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link} from "react-router-dom";
import { FaAngleRight, FaBell, FaFirstAid, FaHospital } from "react-icons/fa";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { MdMessage, MdOutlineEmergency } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { MyContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [activetab, setActivetab] = useState(1);
  const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);
  const isOpenSubmenu = (index) => {
    setActivetab(index);
    setIsToggleSubMenu(!isToggleSubMenu);
  };
  const context = useContext(MyContext);
  const navigate=useNavigate();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
  
    // Optionally clear any user-related state (if you have user data stored in state)
    // setUser(null);
  
    // Navigate to login page
    toast.success('You have been logged out successfully.');
  setTimeout(()=>{
    navigate('/')
  },3000)
  
    // Optionally show a toast message
  
  };
  
  return (
    
    <div className="sidebar ">
      <ToastContainer />
      <ul>
        <li>
          <Link to="/dashboard">
            <Button
              className={`${activetab === 1 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <RxDashboard />{" "}
              </span>
              Dashboard
            </Button>
          </Link>
        </li>
        <li>
          <Button
           
          >
          <span className="icon">
                <FaBell />{" "}
              </span>
           
            <Link to="getupdate"> Get update</Link>
            
          </Button>
          <div
            className={`submenuWrapper ${
              activetab === 2 && isToggleSubMenu === true ? "colapse" : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to="#">List of Centers</Link>
              </li>
              <li>
                <Link to="#">Center Details</Link>
              </li>
              <li>
                <Link to="#">Add New Center</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to="">
            <Button
              className={`${activetab === 3 && isToggleSubMenu === true ? "active" : ""}`}
              onClick={() => isOpenSubmenu(3)}
            >
              <span className="icon">
                <FaFirstAid />{" "}
              </span>
              <Link to='/newCase'>Add Cases today</Link>
              <span className="arrow">
                {" "}
                <FaAngleRight />{" "}
              </span>
            </Button>
          </Link>
        </li>
        {/* <li>
          <Link to="">
            <Button
              className={`${activetab === 4 && isToggleSubMenu === true ? "active" : ""}`}
              onClick={() => isOpenSubmenu(4)}
            >
              <span className="icon">
                <MdOutlineEmergency />{" "}
              </span>
              Response Teams
              <span className="arrow">
                {" "}
                <FaAngleRight />{" "}
              </span>
            </Button>
          </Link>
        </li> */}
        <li>
          <Link to="/message">
            <Button
              className={`${activetab === 5 && isToggleSubMenu === true ? "active" : ""}`}
              onClick={() => isOpenSubmenu(5)}
            >
              <span className="icon">
                <MdMessage />{" "}
              </span>
              <Link to='/messages'>Messages</Link>
              <span className="arrow">
                {" "}
                <FaAngleRight />{" "}
              </span>
            </Button>
          </Link>
        </li>
        {/* <li>
          <Link to="">
            <Button
              className={`${activetab === 6 && isToggleSubMenu === true ? "active" : ""}`}
              onClick={() => isOpenSubmenu(6)}
            >
              <span className="icon">
                <FaBell />{" "}
              </span>
              Notifications
              <span className="arrow">
                {" "}
                <FaAngleRight />{" "}
              </span>
            </Button>
          </Link>
        </li> */}
        {/* <li>
          <Link to="/">
            <Button
              className={`${activetab === 7 && isToggleSubMenu === true ? "active" : ""}`}
              onClick={() => isOpenSubmenu(7)}
            >
              <span className="icon">
                <IoMdSettings />{" "}
              </span>
              Settings
              <span className="arrow">
                {" "}
                <FaAngleRight />{" "}
              </span>
            </Button>
          </Link>
        </li> */}
      </ul>

      <div className="logoutWrapper " style={{position:"relative",top:'120px'}}>
        <div className="logoutBox">
          
          <Button type="button" variant="contained" onClick={handleLogout}>
            <IoMdLogOut onClick={handleLogout}/> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
