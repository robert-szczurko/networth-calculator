import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/Header.css";
import { auth } from "../firebase";
import MenuIcon from "@material-ui/icons/Menu";

function Header({ startUpCheck, toggleSideBar, sideBarWidth }) {
  const [user] = useAuthState(auth);

  return (
    <div className="header-container">
      <div
        className={
          sideBarWidth
            ? "header-left header-left-open"
            : "header-left header-left-closed"
        }>
        {startUpCheck && <MenuIcon onClick={toggleSideBar} />}
      </div>
      <div className="header-right">
        <p>{user?.displayName}</p>
        <img src={user?.photoURL} alt="test" onClick={() => auth.signOut()} />
      </div>
    </div>
  );
}

export default Header;
