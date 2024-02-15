import React from "react";

function CardFlex({ img, title, paragraph }) {
  return (
    <div id="CardFlex">
      <div className="flex    max-[769px]:m-5 m-5   max-[426px]:w-3/4">
        <img
          src={img}
          className="	me-5 max-[769px]:w-40 max-[769px]:h-22 w-48 h-48"
        />
        <div className="max-[426px]:w-44">
          <h5 className="font-bold	">{title}</h5>
          <p>{paragraph}</p>
        </div>
      </div>
    </div>
  );
}

export default CardFlex;
