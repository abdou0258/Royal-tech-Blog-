import React from "react";

function Card({ img, category, title }) {
  return (
    <div id="Card">
      <div
        className="  m-5   "
        style={{
          backgroundColor: "var(--bg-color) ",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <img src={img} className="	me-5 w-full " />
        <div className="p-10">
          <h5 style={{ color: "var(--accent-color) " }}>{category}</h5>
          <h3 className="font-normal	">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
