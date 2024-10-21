import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Avatar, Button } from "@mui/material";
import {
  MdMenuOpen,
  MdOutlineMailOutline,
  MdOutlineMenu,
} from "react-icons/md";
import SearchBox from "../SearchBox/SearchBox";
import { CiLight } from "react-icons/ci";
import { IoCartOutline, IoShieldHalfSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import UserImage from "../../assets/userImg.jpg";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MyContext } from "../../App";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElP, setAnchorElP] = useState(null);
  const [notification, setnotification] = useState(null);
  const context = useContext(MyContext);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorElP);
  const open2 = Boolean(notification);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenMyAccDrop = (event) => {
    setAnchorElP(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorElP(null);
  };
  const handleOpenNotificationDrop = (event) => {
    setnotification(event.currentTarget);
  };

  const handleCloseNotificationDrop = () => {
    setnotification(null);
  };

  return (
    <div className=" shadow-md">
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100 ">
            <div className="col-sm-2 part1 ">
              <Link to="/" className="d-flex align-items-center logoWrapper">
                <img src={Logo} className="logo" />
                <span className="logo-name !text-[#223A66]">MurburgCare</span>
              </Link>
            </div>
            <div className="col-sm-3 d-flex align-items-center part2 ">
              <Button
                className="rounded-circle "
                onClick={() =>
                  context.setIsToggleSideBar(!context.isToggleSideBar)
                }
              >
                {context.isToggleSideBar ? <MdOutlineMenu /> : <MdMenuOpen />}
              </Button>
              <SearchBox />
            </div>
            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
              <Button className="rounded-circle ">
                <CiLight />
              </Button>
              <Button className="rounded-circle " onClick={handleClick}>
              <MdOutlineMailOutline />
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      position: "fixed",
                      top: "60px",
                      right: 0,
                      height: "70vh",
                      width: "250px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "fixed",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div class="head d-flex justify-content-between align-items-center pl-3 pr-3">
                  <h6>Order (12)</h6>
                  <Settings fontSize="small" />
                </div>
                <Divider className="pb-2" />
                <MenuItem onClick={handleClose}>
                  <div className="d-flex flex-column">
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                  </div>
                </MenuItem>
              </Menu>             
              <Button
                className="rounded-circle "
                onClick={handleOpenNotificationDrop}
              >
                <FaRegBell />
              </Button>

              <Menu
                anchorEl={notification}
                id="account-menu"
                open={open2}
                onClose={handleCloseNotificationDrop}
                onClick={handleCloseNotificationDrop}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      position: "fixed",
                      top: "80px",
                      right: 0,
                      height: "70vh",
                      width: "250px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "relative",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleCloseNotificationDrop} sx={{}}>
                  <div className="d-flex flex-column">
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                    <div className="notification d-flex ">
                      <div className="userImg d-flex align-items-center justify-content-center">
                        <span className="rounded-circle">
                          <Avatar src="" />
                        </span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>
                            <b>Jean Bosco </b>
                            added to his favorite list
                            <b> Leather steve madden</b>
                          </span>
                        </h4>
                        <span className="text-sky">few seconds ago</span>
                      </div>
                    </div>
                  </div>
                </MenuItem>

                <Button
                  variant="contained"
                  sx={{
                    width: "98%",
                    paddingLeft: 1,
                    paddingRight: 1,
                    position: "absolute",
                    bottom: 0,
                  }}
                >
                  {" "}
                  View All Notifications
                </Button>
              </Menu>
              {context.isLogin != true ? (
                <Button className="btn-blue">Sign In</Button>
              ) : (
                <div className="myAccDrop">
                  <Button
                    className="myAcc d-flex align-items-center"
                    onClick={handleOpenMyAccDrop}
                  >
                    <div className="userImg">
                      <span className="rounded-circle">
                        <Avatar
                          src={UserImage}
                          sx={{ border: "solid 1.5px #0858f7" }}
                        />
                      </span>
                    </div>
                    <div className="userInfo">
                      <h4>Jean Bosco</h4>
                      <p className="mb-0">@bosco15</p>
                    </div>
                  </Button>
                  <Menu
                    sx={{ fontSize: "14px" }}
                    anchorEl={anchorElP}
                    id="account-menu"
                    open={open1}
                    onClose={handleCloseMyAccDrop}
                    onClick={handleCloseMyAccDrop}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleCloseMyAccDrop} sx={{}}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      My account
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAccDrop} sx={{}}>
                      <ListItemIcon>
                        <IoShieldHalfSharp fontSize="small" />
                      </ListItemIcon>
                      Resert Password
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseMyAccDrop}
                      sx={{ color: "red" }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
