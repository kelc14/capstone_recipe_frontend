import React from "react";

import "./SomethingWentWrong.css";

const SomethingWentWrong = () => {
  return (
    <div className="SomethingWentWrong">
      <h2 className="SomethingWentWrong-header"> OOPS! </h2>
      <img
        src="/images/broken_egg.png"
        className="SomethingWentWrong-image"
        alt="broken egg"
      />
      <p className="SomethingWentWrong-text">Something Went Wrong :( </p>
      <p className="SomethingWentWrong-text"> Please try again later. </p>
    </div>
  );
};

export default SomethingWentWrong;
