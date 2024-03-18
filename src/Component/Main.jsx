import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Main = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  return (
    <div className="main" >
      <div className="d-none d-md-block">
        <Sidebar setSidebarOpen={setSidebarOpen} toggleDrawer={toggleDrawer}/>
      </div>
      {/* <div className="d-md-none d-block">
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
      </div> */}

      <div className="d-md-none d-block">
        <Box sx={{ flexGrow: 1 }} style={{ position: 'fixed', top: 0, zIndex: 1 , width:"100%" , background:"#1877f2"}}>
          <AppBar position="static" style={{background:"#1877f2"}}>
            <Toolbar className="flex justify-content-between">
              <IconButton
               onClick={toggleDrawer(true)}         
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)}>
              <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>
              <Button color="inherit">KODUKKU</Button>
            </Toolbar>

          </AppBar>
        </Box>
      </div>

      <div className="container py-4">
        <Outlet />
      </div>

      {/* <button
        className="d-md-none d-block btn"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "2px 8px 6px 8px",
          borderRadius: "31%",
          background: "#1877f2",
          color: "#fff",
        }}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <RxCross2 /> : <RxHamburgerMenu />}
      </button> */}
    </div>
  );
};

export default Main;
