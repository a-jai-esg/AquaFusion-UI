import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ElectricMeterOutlinedIcon from "@mui/icons-material/ElectricMeterOutlined";
// user-added
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AquaFusionSideBarElement from "../../components/AquaFusionSidebarElement";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 30px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "15px 0 20px 0",
              color: colors.grey[100],
              listStyleType: "none",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/*
                  <Typography variant="h3" color={colors.grey[100]}>
                    AquaFusion
                  </Typography>
                */}
                <AquaFusionSideBarElement />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User */}
          <MenuItem>
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.jpg`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Jennie Kim
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Registered Administrator
                  </Typography>
                </Box>
              </Box>
            )}
          </MenuItem>

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "9%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Label */}
            <Typography
              variant="h6"
              color={colors.greenAccent[500]}
              fontWeight="400"
              sx={{ m: "25px auto 5px 20px" }}
            >
              Users
            </Typography>
            {/* End Label */}

            <Item
              title="Manage Workgroup"
              to="/manage-workgroup"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Register Farmer"
              to="/register-farmer"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Harvest Calendar"
              to="/harvest-calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Label */}
            <Typography
              variant="h6"
              color={colors.greenAccent[500]}
              fontWeight="400"
              sx={{ m: "25px auto 5px 20px" }}
            >
              System
            </Typography>
            {/* End Label */}
            <Item
              title="System Notifications"
              to="/notifications"
              icon={<NotificationsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Aquatic Sensors Status"
              to="/aquatic-sensor-status"
              icon={<WaterDropOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Terrestrial Sensors Status"
              to="/terrestrial-sensor-status"
              icon={<NatureOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Adjust System Thresholds"
              to="/adjust-system-thresholds"
              icon={<ElectricMeterOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Technical Support"
              to="/support"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/*Logout of session*/}

            {/* Label */}
            <Typography
              variant="h6"
              color={colors.greenAccent[500]}
              fontWeight="400"
              sx={{ m: "25px 0 5px 20px" }}
            >
              Session
            </Typography>
            {/* End Label */}
            <Item
              title="Log Out"
              to="/logout"
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
