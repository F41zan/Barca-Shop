import React from "react";
import "../UI/BarcaLoader.scss";

const BarcaLoader = () => {
  return (
    <div className="barca-loader-wrapper">
      <div className="barca-stripes"></div>

      <div className="barca-logo-box">
        <h1 className="barca-text">FCB</h1>
        <div className="gold-loader-line"></div>
      </div>

      <p className="loading-text">Visca Barça</p>
    </div>
  );
};

export default BarcaLoader;