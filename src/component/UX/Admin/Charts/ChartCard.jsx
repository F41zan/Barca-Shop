import React from "react";

const ChartCard = ({ children, title, subTitle }) => {
  return (
    <div className="card-charts">
      <div className="total-revenue">
        <div className="chart-head">
          <h3>{title}</h3>
          {subTitle && <p>{subTitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
