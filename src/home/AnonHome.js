import React from "react";
import "./AnonHome.css";
import Slideshow from "./slideshow/Slideshow";

/** AnonHome
 *
 * => Homepage displays to non-authenticated users
 *
 * Renders: Slideshow
 */
const AnonHome = () => {
  return (
    <>
      <div className="AnonHome">
        <img
          src="/images/whisk_logo.png"
          alt="whisk logo"
          className="AnonHome-whisk-logo"
        />
        <p className="AnonHome-slogan">take a whisk & roll with it.</p>
      </div>
      <div className="AnonHome-slideshow">
        <Slideshow />
      </div>
    </>
  );
};

export default AnonHome;
