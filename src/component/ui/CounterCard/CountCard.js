import React from "react";
import { Icon } from "semantic-ui-react";

const CountCard = ({ title, icon, value, color }) => {
  return (
    <div
      style={{
        color: "#fff",
        background: color,
        width: "210px",
        padding: "15px",
        border: "5px solid #fff",
        borderRadius: "30px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Icon name={icon} size="big" />
      <h3>{title}</h3>
      <span
        style={{
          color: color,
          backgroundColor: "#fff",
          fontSize: "30px",
          fontWeight: "700",
          textAlign: "center",
          padding: "10px 0",
          borderRadius: "20px",
          display: "block",
        }}
      >
        {value ? value : 0}
      </span>
    </div>
  );
};

export default CountCard;
