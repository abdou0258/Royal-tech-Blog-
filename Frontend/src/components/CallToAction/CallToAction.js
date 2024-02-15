import React from "react";
import img from "../../assets/image 11.jpg";
import CAT2 from "../../buttons/CAT2";
function CallToAction() {
  return (
    <section
      id="call-to-action"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <div
        className="grid min-[769px]:grid-cols-2 mt-20"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <div className="text-center ms-5 p-10">
          <h1>Join us</h1>
          <h5 className="mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            sapien diam, dit et, mollis non nunc. Vestibulum.
          </h5>
          <CAT2 />
        </div>
        <img src={img} alt="tech" className="w-full h-full" />
      </div>
    </section>
  );
}

export default CallToAction;
