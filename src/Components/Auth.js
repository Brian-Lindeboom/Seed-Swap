import { useState } from "react";
import axios from "axios";
import { loginUser } from "../redux/reducer";
import { connect } from "react-redux";


const Auth = (props) => {
  const [toggle, setToggle] = useState(true);
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const handleEmailInput = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const login = () => {
    axios
      .post("/auth/login", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push(`/profile/${res.data.user_id}`);
        console.log(res.data.user_id)
      })
      .catch((err) => {
        console.log(err)
        alert("Email or password incorrect");
      });
  };

  const register = () => {
    axios
      .post("/auth/register", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push(`/profile/${res.data.user_id}`);
       
      })
      .catch((err) => {
        console.log(err)
        alert('There was an error');
      });
  };

  return (
    <div className="auth-major">
      <div className="auth-box">
        <img src="logo.png" alt ='' />
        <h1>{toggle ? "Login " : "Register"}</h1>
        <input
          name="email"
          placeholder="email"
          type="email"
          value={emailInput}
          onChange={handleEmailInput}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          value={passwordInput}
          onChange={handlePasswordInput}
        />
        {toggle ? (
          <div className="login-button">
            <button onClick={login}>Login</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="login-button">
            <button onClick={register}>Register</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Auth);