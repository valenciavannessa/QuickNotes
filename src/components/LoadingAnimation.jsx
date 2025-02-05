import React from "react";

function LoadingAnimation() {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <img src="/loading.svg"></img>
        <h4>Waiting for the result...</h4>
      </div>
    </div>
  );
}

export default LoadingAnimation;
