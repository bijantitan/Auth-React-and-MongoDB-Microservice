import registerImg from "../../assets/images/register.svg";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

export default function Register() {
  const register = (e) => {
    e.preventDefault();
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !phoneNo || !password) {
      alert("Please enter all fields");
      return;
    }

    fetch("http://localhost:5000/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phoneNo,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Registration successful");
          window.location.href = "/";
        }
      });
  };

  return (
    <>
      <div className="body">
        <div className="image">
          <img src={registerImg} alt="Register" className="loginImg" />
        </div>
        <div className="registerSec">
          <h1>User Signup</h1>
          <p>Hey enter your details to create your account</p>
          <form className="registerForm">
            <PersonOutlineIcon className="icon" />
            <input
              type="name"
              placeholder="Enter your Name"
              required
              id="name"
            />
            <EmailIcon className="icon" />
            <input type="email" placeholder="Email Id" required id="email" />
            <PhoneAndroidIcon className="icon" />
            <input
              type="phone"
              placeholder="Enter your Phone"
              required
              id="phoneNo"
            />
            <LockIcon className="icon" />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
            />
            <button
              type="submit"
              id="register"
              onClick={register}
              className="registerBtn"
            >
              Sign up
            </button>
          </form>
          <p>
            Already have an account? <a href="/">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}
