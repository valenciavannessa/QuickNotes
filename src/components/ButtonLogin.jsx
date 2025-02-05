import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

function ButtonLogin() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div>
            <button className="btn-register" type="submit">
              {locale === "EN" ? "Login" : "Masuk"}
            </button>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default ButtonLogin;
