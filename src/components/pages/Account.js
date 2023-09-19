import "./Account.css";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let timer;
    const onPageLoad = () => {
      timer = setTimeout(() => {
        setFade("account-container-fade");
      }, 200);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
    }

    return () => {
      clearTimeout(timer);
      setFade("");
      window.removeEventListener("load", onPageLoad);
    };
  }, []);

  return (
    <>
      <div className={"account-container " + fade}>
        <div className="account-logo-container">
          <button onClick={() => navigate("/")}></button>
        </div>

        <div className="account-login-signup-container">
          <div className="account-login-flexbox">
            <form>
              <h2>Login</h2>
              <input type="email" placeholder="Email" required></input>
              <input type="password" placeholder="Password" required></input>
              <button type="submit">SIGN IN</button>
              <p>FORGOT PASSWORD?</p>
            </form>
          </div>
          <div className="account-signup-flexbox">
            <form>
              <h2>Register</h2>
              <input type="text" placeholder="First Name" required></input>
              <input type="text" placeholder="Last Name" required></input>
              <input type="email" placeholder="Email" required></input>
              <input type="password" placeholder="Password" required></input>
              <div className="account-checkbox-container">
                <input
                  type="checkbox"
                  id="sign-up-checkbox"
                  className="account-checkbox"
                  required
                ></input>
                <label htmlFor="sign-up-checkbox">
                  BE THE FIRST TO KNOW ABOUT NEW PRODUCT INTRODUCTIONS AND
                  EXCLUSIVE CONTENT.
                </label>
              </div>

              <button>REGISTER</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
