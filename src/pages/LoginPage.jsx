import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogin from "../components/ButtonLogin";
import useInput from "../hooks/useInput";
import { login } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";
import PropTypes from "prop-types";

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  async function onSubmit(event) {
    event.preventDefault();

    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="content">
            <h2 className="note-title">
              {locale === "EN" ? "Login" : "Masuk"}
            </h2>
            <form onSubmit={onSubmit}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                className="input-email"
                onChange={onEmailChangeHandler}
              />
              <input
                id="password"
                type="password"
                placeholder={locale === "EN" ? "Password" : "Kata Sandi"}
                value={password}
                className="input-password"
                onChange={onPasswordChangeHandler}
              />
              <ButtonLogin />
              <p className="login-note">
                {locale === "EN"
                  ? "Don't have any account?"
                  : "Tidak memiliki akun?"}{" "}
                <Link to={"/register"}>
                  {locale === "EN" ? "Register Here" : "Daftar disini"}
                </Link>
              </p>
            </form>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.prototypes = {
  loginSucces: PropTypes.func.isRequired,
};

export default LoginPage;
