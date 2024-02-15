import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SpotlightButton = ({ text, color }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    const btnElement = btnRef.current;

    if (btnElement) {
      btnElement.addEventListener("mousemove", handleMouseMove);
      btnElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (btnElement) {
        btnElement.removeEventListener("mousemove", handleMouseMove);
        btnElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.985 }}
        ref={btnRef}
        className="relative w-full max-w-xs overflow-hidden rounded-lg  px-4 py-3 text-lg font-medium text-white  mt-10"
        style={{ backgroundColor: color }}
        type="submit"
      >
        <span className="pointer-events-none relative z-10 mix-blend-difference ">
          <h5>{text}</h5>
        </span>
        <span
          ref={spanRef}
          className="pointer-events-none absolute left-[50%] top-[50%] h-40 w-40 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
        />
      </motion.button>
    </>
  );
};

export default SpotlightButton;
