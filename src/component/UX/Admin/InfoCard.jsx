import React from "react";
import '../../UI/InfoCard.scss';

const InfoCard = ({ dataNo, title, desc, icon, bgc, color, flexEnd }) => {
  return (
    <div className="info-card">
      <div className="title">{title}</div>
      <div
        className="digit-info"
        style={{ alignItems: flexEnd ? "flex-end" : "center" }}
      >
        <h3 style={{ color: color }}>{dataNo}</h3>
        <div
          className="icon-wrapper"
          style={{ backgroundColor: bgc, color: color }}
        >
          {icon}
        </div>
      </div>
      {desc && (
        <div className="card-desc">
          <h5 style={{ color: color }}>{desc}</h5>
        </div>
      )}
    </div>
  );
};

export default React.memo(InfoCard);
