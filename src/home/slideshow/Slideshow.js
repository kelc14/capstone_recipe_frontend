import React, { useState, useEffect } from "react";

import "./Slideshow.css";

const Slideshow = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  const delay = 2500;
  let images = [
    "/images/slideshow/food1.png",
    "/images/slideshow/food2.png",
    "/images/slideshow/food3.png",
  ];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="Slideshow">
      <div
        className="Slideshow-slider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <img className="Slideshow-slide" key={index} src={image} />
        ))}
      </div>

      <div className="Slideshow-dots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`Slideshow-dot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
