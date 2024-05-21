/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./login.css";
import loginImg from "../../assets/images/login.jpg";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => {
    toast.error("Login Failed !");
  };

  const login = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoading(true);

    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          alert(data.error);
        } else {
          sessionStorage.setItem("token", data.token);
          document.cookie = `token=${data.token};path=/`;
          window.location.href = "/home";
        }
      })
      .catch((err) => {
        setIsLoading(false);
        notify();
        console.log(err);
      });
  };

  return (
    <>
      <div className="body">
        <div className="image">
          <img src={loginImg} alt="Login" className="loginImg" />
        </div>
        <div className="loginSec">
          <h1>USER LOGIN</h1>
          <form className="loginForm">
            <EmailIcon className="icon" />
            <input type="email" placeholder="Email Id" required id="email" />
            <LockIcon className="icon" />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
            />
            <button
              type="submit"
              id="login"
              onClick={login}
              className="loginBtn"
            >
              {isLoading ? <CircularProgress /> : "Sign in"}
            </button>
          </form>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
