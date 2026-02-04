import React from "react";
import "../UI/CollectionCard.scss";
import { NavLink, useNavigate } from "react-router-dom";

const CollectionCard = ({item}) => {
  const {  description,id ,images,price,title} = item;
  const truncate = (text = "") => {
    return text.length > 40 ? text.slice(0, 30) + "..." : text;
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card">
      <NavLink to={`/product/${id}`}>
      <div className="img-wrapper">
        <img src={images[0]} alt="cards" />
      </div>
      </NavLink>
      <div className="info">
        <div className="about">
          <p className="para">{truncate(title)}</p>
          <h4 className="price">₹{price} INR</h4>
          <h5 onClick={handleNavigate} >View Details</h5>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
