import React, { useState } from "react";
import "./Login.css";
import Btn from "../../buttons/Btn";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!email) {
      return setError("Please provide your email");
    }
    if (!password || password.length < 8 || password.length > 20) {
      return setError(
        "Please enter a valid password (minimum 8 characters, maximum 20 characters)"
      );
    }

    try {
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/admin/blogs");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div id="login">
      <h1 className="mt-0 pt-10">admin panel</h1>
      <form
        className="flex flex-col mx-auto w-2/4 mt-20"
        noValidate
        id="login-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          <h5>Email:</h5>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">
          <h5>Password:</h5>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        {error && (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div className="flex justify-center login-btn">
          <Btn text="Login" color="var(--second-color)" />
        </div>
      </form>
    </div>
  );
}

export default Login;
