import React, { FunctionComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import About from "./About";

interface FooterProps {
  userInfo: any;
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo }) => {
  return (
    <div className="footer">
      <div className="icon-container">
        {(userInfo.role === "business" || userInfo.role === "admin") && (
          <Link to="/MyCar" className="about-link mx-3" style={{ color: "#000000" }}>
            <i className="fa-solid fa-car fa-beat" style={{ color: "#000000" }}></i>
            <br />
            My Car
          </Link >
        )}
        <Link to="/about" className="about-link" style={{ color: "#000000" }}>
          <i className="fa-solid fa-exclamation-circle" style={{ color: "#000000" }}></i>
          <br />
          ABOUT
        </Link >
        {(userInfo.role === "business" || userInfo.role === "regular" || userInfo.role === "admin") && (
          <Link to="/Fav" className="about-link mx-3" style={{ color: "#000000" }}>
            <i className="fa-solid fa-heart" style={{ color: "#000000" }}></i>
            <br />
            Want car
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;

