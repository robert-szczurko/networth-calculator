import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ Icon, name, sidebarWidth, link, closeSideBar }) {
  return (
    <Link to={link}>
      <div className="sidebar-item" onClick={closeSideBar}>
        <Icon />
        {sidebarWidth && <p>{name}</p>}
        {!sidebarWidth && <p className="sidebar-item-hover">{name}</p>}
      </div>
    </Link>
  );
}

export default SidebarItem;
