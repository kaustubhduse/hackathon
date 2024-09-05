import React from "react";
import navbarimg from "../../assets/navbar.png";

function Navbar() {
  return (
    <div>
      <div className="p-3 ml-[5%]">
        <img src={navbarimg} alt="navbar" className="navbarimg" />
      </div>
    </div>
  );
}

export default Navbar;
