import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonRegister from "../components/ButtonRegister";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, onNameChangeHandler] = useInput("");
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      register({
        name: name,
        email: email,
        password: password,
      });

      if (
        name !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== ""
      ) {
        navigate("/*");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="content">
            <h2 className="note-title">
              {locale === "EN" ? "Register" : "Daftar"}
            </h2>
            <form onSubmit={onSubmit}>
              <input
                id="name"
                type="text"
                placeholder={
                  locale === "EN" ? "Fill Your Name Here" : "Masukkan Nama"
                }
                value={name}
                className="input-name"
                onChange={onNameChangeHandler}
              />
              <input
                id="email"
                type="email"
                placeholder={
                  locale === "EN" ? "Fill Your Email Here" : "Masukkan Email"
                }
                value={email}
                className="input-email"
                onChange={onEmailChangeHandler}
              />
              <input
                id="password"
                type="password"
                placeholder={
                  locale === "EN" ? "Create Password" : "Buat Kata Sandi"
                }
                value={password}
                className="input-password"
                onChange={onPasswordChangeHandler}
              />
              <input
                id="confirm-password"
                type="password"
                placeholder={
                  locale === "EN" ? "Confirm Password" : "Konfirmasi Kata Sandi"
                }
                value={confirmPassword}
                className="input-confirm-password"
                onChange={onConfirmPasswordChangeHandler}
              />
              <ButtonRegister />
              <p className="login-note">
                {locale === "EN"
                  ? "Already have an account?"
                  : "Sudah memiliki akun?"}{" "}
                <Link to={"/*"}>
                  {locale === "EN" ? "Login Here" : "Masuk disini"}
                </Link>
              </p>
            </form>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
