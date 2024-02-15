import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import "./Modal.css";

const SpringModal = ({ isOpen, setIsOpen }) => {
  const [subEmail, setSubEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [error, setError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    setSubEmail(e.target.value);
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subEmail) {
      return setError("Please enter an email address");
    }
    if (subEmail && !emailRegex.test(subEmail)) {
      return setError("Please enter a valid email address");
    }
    try {
      const response = await fetch("/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subEmail }),
      });
      if (response.status === 201) {
        setSubscriptionStatus("success");
        console.log("Subscription successful");
      } else {
        setSubscriptionStatus("error");
        console.error("Subscription failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubscriptionStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div>
              {subscriptionStatus === "success" ? (
                <>
                  <h3 className="text-3xl font-bold text-center mb-2">
                    Welcome
                  </h3>
                  <p className="text-center mb-6 mt-5">
                    You have successfully subscribed stay tuned !
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-center mb-2">
                    Join Us
                  </h3>
                  <p className="text-center mb-6 mt-5">
                    Join our newsletter and embark on a journey of discovery,
                    inspiration, and empowerment!
                  </p>
                </>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={subEmail}
                  placeholder="Email Address..."
                  className="modal-input"
                  onChange={handleChange}
                />
                {error && (
                  <div>
                    <h5 className="text-center text-red-400">{error}</h5>{" "}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white font-semibold w-full py-2 rounded"
                    type="button"
                  >
                    Close
                  </button>
                  {subscriptionStatus === "success" ? (
                    <button
                      className="hover:opacity-90 transition-opacity font-semibold w-full py-2 rounded"
                      style={{ backgroundColor: "rgb(245, 219, 180)" }}
                      type="submit"
                      disabled
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="hover:opacity-90 transition-opacity font-semibold w-full py-2 rounded"
                      style={{ backgroundColor: "var(--second-color)" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
