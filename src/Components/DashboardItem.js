import React, { useEffect, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import { db } from "../firebase";

function DashboardItem({
  title,
  amount,
  liability,
  intrest,
  month,
  edit,
  user,
  valueUpdate,
  intrestUpdate,
}) {
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState("");
  const [intrestValue, setIntrestValue] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      return setUpdate(false);
    }
  };

  useEffect(() => {
    db.collection(`${user.email}`)
      .doc("user")
      .onSnapshot((doc) => {
        setValue(doc.data()[valueUpdate]);
        setIntrestValue(doc.data()[intrestUpdate]);
      });
  }, []);

  const updateDisplay = () => {
    setUpdate(!update);
  };

  const updateValue = (e) => {
    e.preventDefault();
    if (intrestUpdate) {
      db.collection(`${user.email}`)
        .doc("user")
        .update({
          [valueUpdate]: value,
          [intrestUpdate]: intrestValue,
        });
    } else {
      db.collection(`${user.email}`)
        .doc("user")
        .update({
          [valueUpdate]: value,
        });
    }

    setUpdate(!update);
  };

  const IntrestCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= 100) return true;
    setIntrestValue("100");
  };

  return (
    <div
      ref={cardRef}
      className={liability ? "liability-item card" : "dashboard-item card"}>
      {liability ? (
        <div className="card-inner">
          <h3 className="liability-item-heading">{title}</h3>
          {!update ? (
            <p>{`$${amount}`}</p>
          ) : (
            <form action="" onSubmit={updateValue}>
              <NumberFormat
                thousandSeparator={true}
                prefix={"$"}
                value={value}
                onChange={(e) => {
                  setValue(parseInt(e.target.value.replace(/\D/g, "")));
                }}
              />
            </form>
          )}
          <h3 className="liability-item-heading">Intrest</h3>
          {!update ? (
            <p>{`${intrest}%`}</p>
          ) : (
            <form action="" onSubmit={updateValue}>
              <NumberFormat
                suffix=" %"
                decimalScale={2}
                isAllowed={IntrestCap}
                value={intrestValue}
                onChange={(e) => {
                  setIntrestValue(parseInt(e.target.value.replace(/\D/g, "")));
                }}
              />
            </form>
          )}
        </div>
      ) : (
        <div className="card-inner">
          <h3 className="dashboard-item-heading">{title}</h3>
          {!update ? (
            <p>
              {month ? `${amount}` : `$${amount}`}
              <span>{month && "months"}</span>
            </p>
          ) : (
            <form action="" onSubmit={updateValue}>
              <NumberFormat
                thousandSeparator={true}
                prefix={"$"}
                value={value}
                onChange={(e) => {
                  setValue(parseInt(e.target.value.replace(/\D/g, "")));
                }}
              />
            </form>
          )}
        </div>
      )}
      {edit && (
        <div
          className="edit-values"
          onClick={!update ? updateDisplay : updateValue}>
          <h4>{!update ? "Edit" : "Update"}</h4>
        </div>
      )}
    </div>
  );
}

export default DashboardItem;
