import React, { useState, useEffect, useRef } from "react";
import "./RangeComponentStyle.css";

const RangeComponent = ({ min, max }) => {
  const [minVal, setMinVal] = useState(3000);
  const [maxVal, setMaxVal] = useState(10000);
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const rangeRef = useRef(null);

  // Convert to percentage for the dynamic slider track fill
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  // Adjust the width of the active range track from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, min, max]);

  // Adjust the width of the active range track from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, min, max]);

  return (
    <div className="container">
      {/* Input controls are layered over each other */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      {/* Visual slider element track */}
      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
        <div className="slider__left-value">₹{minVal}</div>
        <div className="slider__right-value">₹{maxVal}</div>
      </div>
    </div>
  );
};

export default RangeComponent;
