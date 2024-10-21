import { TrendingDown, TrendingUp } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import axios from 'axios'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoTimerOutline } from 'react-icons/io5';


function DashboardBox(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Button  className='dashboardBox' style={{backgroundImage:`linear-gradient(to right,${props.color?.[0]},${props.color?.[1]})`}}>
      {props.grow === true ? <span className="chart"> <TrendingUp/> </span>:
      <span className="chart"> <TrendingDown/> </span>
      
    }

      <div className="d-flex w-100 justify-content-space-between">
        <div className="col1">
          <h4 className="text-white">{props.totalName}</h4>
          <span className="text-white">{props.totalValue}</span>
        </div>
        <div className=" ml-auto ">
          <span className="icon"> 
            {props.icon}
          </span>
        </div>
      </div>
      <div className="d-flex w-100 align-items-center bottomEle justify-content-space-between">
        <h6 className="text-white mb-0 mt-0"> Last Month</h6>
        <div className="ml-auto">          
          <span className="ml-auto toggleIcon" onClick={handleClick}> <HiDotsVertical/> </span>
          <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              // maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        
          <MenuItem  onClick={handleClose}>
          <span className="menu-icon" style={{marginRight:'5px'}}><IoTimerOutline/> </span>
           Last Day
          </MenuItem>      
          <MenuItem onClick={handleClose}>
          <span className="menu-icon" style={{marginRight:'5px'}}><IoTimerOutline/> </span>
           Last Week
          </MenuItem>    

          <MenuItem  onClick={handleClose}>
          <span className="menu-icon" style={{marginRight:'5px'}}><IoTimerOutline/> </span>
           Last Month
          </MenuItem>    
          <MenuItem  onClick={handleClose}>
          <span className="menu-icon" style={{marginRight:'5px'}}><IoTimerOutline/> </span>
           Last Year
          </MenuItem>        
      </Menu>
        </div>
      </div>
    </Button>
  )
}

export default DashboardBox
