import React from "react";
import "../css/Sidebar.css";
import SidebarItem from "./SidebarItem";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";

function Sidebar({ sideBarWidth, closeSideBar }) {
  return (
    <div
      className={
        sideBarWidth ? "sidebar sidebar-open" : "sidebar sidebar-closed"
      }>
      <div className="sidebar-container">
        <div className="sidebar-logo">
          {sideBarWidth && (
            <img
              src="https://networthtelecom.fr/wp-content/uploads/2021/01/Logo-Netw-bleu.png"
              alt=""
            />
          )}
        </div>
        <div className="sidebar-options">
          <SidebarItem
            Icon={HomeIcon}
            name="Dashboard"
            sidebarWidth={sideBarWidth}
            link="/"
            closeSideBar={closeSideBar}
          />
          <SidebarItem
            Icon={AttachMoneyIcon}
            name="Savings"
            sidebarWidth={sideBarWidth}
            link="/savings"
            closeSideBar={closeSideBar}
          />
          <SidebarItem
            Icon={EqualizerIcon}
            name="Assets"
            sidebarWidth={sideBarWidth}
            link="/assets"
            closeSideBar={closeSideBar}
          />
          <SidebarItem
            Icon={MoneyOffIcon}
            name="Liabilities"
            sidebarWidth={sideBarWidth}
            link="/liabilities"
            closeSideBar={closeSideBar}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
