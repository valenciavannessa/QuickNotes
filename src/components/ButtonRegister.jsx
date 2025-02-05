import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

function ButtonRegister() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div>
            <button className="btn-register" type="submit">
              {locale === "EN" ? "Create Account" : "Buat Akun"}
            </button>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default ButtonRegister;
