import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Header from "./Header";
import AppBody from "./AppBody";
import { db } from "../firebase";
import StartInputs from "./StartInputs";

function SetDisplay({ user }) {
  const [display, setDisplay] = useState(<Loading />);
  const [startUpCheck, setStartUpCheck] = useState(false);
  const [sideBarWidth, setSideBarWidth] = useState(false);

  useEffect(() => {
    db.collection(`${user.email}`).onSnapshot((snapshot) => {
      let check = snapshot.docs.map((doc) => ({
        startUpComplete: doc.data().startUpComplete,
      }));
      {
        !check[0]?.startUpComplete
          ? setDisplay(<StartInputs user={user} />)
          : startUpComplete();
      }
    });
  }, [user]);

  const startUpComplete = () => {
    setDisplay("");
    setStartUpCheck(true);
  };

  const toggleSideBar = () => {
    setSideBarWidth(!sideBarWidth);
  };

  const closeSideBar = () => {
    setSideBarWidth(false);
  };

  return (
    <div>
      <Header
        startUpCheck={startUpCheck}
        sideBarWidth={sideBarWidth}
        toggleSideBar={toggleSideBar}
      />
      {display}
      {startUpCheck && (
        <AppBody
          sideBarWidth={sideBarWidth}
          user={user}
          closeSideBar={closeSideBar}
        />
      )}
    </div>
  );
}

export default SetDisplay;
