import React from "react";
import CAT2 from "../../buttons/CAT2";
import "./Footer.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <section id="footer">
      <div className="banner text-center mt-40 pt-8 pb-20 px-10">
        <h1>Join us</h1>
        <h5>
          Join our newsletter and embark on a journey of discovery, inspiration,
          and empowerment!
        </h5>
        <div className="mt-10">
          <CAT2 />
        </div>
      </div>

      <div className="grid min-[769px]:grid-cols-2 pt-4 pb-10">
        <div className="mx-auto">
          <img src={logo} alt="logo" width={200} height={200} />
          <div className="flex justify-center">
            <i
              className="fa-brands fa-instagram px-5 text-2xl"
              style={{ color: "#0e1625;" }}
            ></i>
            <i
              className="fa-brands fa-x-twitter px-5  text-2xl"
              style={{ color: "#0e1625;" }}
            ></i>
            <i
              className="fa-brands fa-tiktok px-5 text-2xl"
              style={{ color: "#0e1625;" }}
            ></i>
          </div>
        </div>
        <div className="flex mx-auto">
          <div className="nav-links-footer flex justify-center items-center m-10">
            <ul>
              <Link to="/software">
                <li className="text-lg py-2 font-semibold">Software</li>
              </Link>
              <Link to="/hardware">
                <li className="text-lg py-2 font-semibold">Hardware</li>
              </Link>
              <Link to="/biotech">
                <li className="text-lg py-2 font-semibold">BioTech</li>
              </Link>
            </ul>
          </div>
          <div className="info flex flex-col justify-center items-center m-10">
            <p>abdouhdd16@gmail.com</p>
            <p>algiers,algeria</p>
            <Link to ="/admin">

            <p className="text-bold underline">Admin</p>
            </Link>
          </div>
         
        </div>
      </div>
    </section>
  );
}

export default Footer;
