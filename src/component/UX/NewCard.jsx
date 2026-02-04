import React, { useState } from "react";
import "../UI/NewCard.scss";
import { useNavigate } from "react-router-dom";

const NewCard = ({ image, desc, price, itemId, }) => {
  const truncate = (text = "") => {
    return text.length > 25 ? text.slice(0, 25) + "..." : text;
  };
  const [selectedCart, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const handleProductNavigate = (itemId) => {
    setSelectedCard(itemId);
    navigate(`/product/${itemId}`);
  };
  return (
    <div  className="Newcard" onClick={() => handleProductNavigate(itemId)}>
      <div className="img-wrapper">
        <img src={image} alt="cards" />
      </div>
      <div className="info">
        <h3>Stadium Collection</h3>
        <div className="about">
          <p className="para">{truncate(desc)}</p>
          <h4 className="price">₹{price} INR</h4>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
