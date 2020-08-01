import React from "react";

const FooterComponant = () => {
  let NewDate = new Date().getFullYear();

  return (
    <div>
      <div className="navbar-dark bg-dark ">
        <p className="text-center text-light" style={{ padding: "15px" }}>
          {NewDate} &copy; All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterComponant;
