import React from "react";
import { motion } from "framer-motion";
import "../../App.css";
import img1 from "../../assets/hero-imgs/image 2.jpg";
import img2 from "../../assets/hero-imgs/image 3.jpg";
import img3 from "../../assets/hero-imgs/image 4.jpg";
import img4 from "../../assets/hero-imgs/image 5.jpg";
import img5 from "../../assets/hero-imgs/image 7.jpg";
import img6 from "../../assets/hero-imgs/image 8.jpg";
function Hero() {
  return (
    <section id="hero">
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your favourite tech blog!
      </motion.h1>

      <div
        className="gallery grid grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-6 gap-4 mt-8 "
        style={{ justifyContent: "center" }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="gallery-item"
        >
          <img src={img1} alt="" className="mx-auto" />
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="gallery-item"
        >
          <img src={img2} alt="" className="mx-auto" />
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="gallery-item"
        >
          <img src={img3} alt="" className="mx-auto" />
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="gallery-item"
        >
          <img src={img4} alt="" className="mx-auto" />
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="gallery-item"
        >
          <img src={img5} alt="" className="mx-auto" />
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="gallery-item"
        >
          <img src={img6} alt="" className="mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
