import React from "react";

export default function Graph({ component }) {
  return (
    <svg
      className="availability-time-line-graphic"
      preserveAspectRatio="none"
      height="34"
      viewBox="0 0 448 34"
    >
      {Array.from({ length: 90 }, (_, index) => (
        <rect
          key={index}
          height="34"
          width="3"
          x={index * 5}
          y="0"
          fill="#b3bac5"
          className={`uptime-day component-${component.id} day-${index}`}
          data-html="true"
        ></rect>
      ))}
    </svg>
  );
}
