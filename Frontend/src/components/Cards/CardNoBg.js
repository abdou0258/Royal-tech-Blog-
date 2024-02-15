import React from "react";

function CardNoBg({ img, title, paragraph }) {
  return (
    <div className="my-16 mx-5 min-[768px]:m-6  ">
      <img src={img} alt="woman tech" className="w-full" />
      <h3>{title}</h3>
      <h5>{paragraph}</h5>
    </div>
  );
}

export default CardNoBg;
