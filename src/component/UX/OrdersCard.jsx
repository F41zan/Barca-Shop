import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CardContext } from "../Context/CardContext";
const OrdersCard = ({item}) => {
    const {removeFromCart,deleteFromCart,addToCart} = useContext(CardContext);
    const {id,title,price,images,selectedSize,selectedQty} = item;
  return (
    <div className="order">
      <div className="order-info">
        <div className="img-wrapper">
          <img src={images[0]} alt="" />
        </div>
        <div className="about-order">
          <div className="desc">
          <div className="description">
            <h2>{title}</h2>
            <p>
              <span>Size: {selectedSize}</span> <span>Kids_kits</span>
            </p>
          </div>
          <div className="quantity">
            <div className="heading">
              <span>Quantity:</span>
            </div>
            <div className="add-sub">
              <span className="btn" onClick={()=>removeFromCart(id,selectedSize)}>-</span>
              <span className="cnt">{selectedQty}</span>
              <span className="btn" onClick={()=>addToCart(id,selectedSize)}>+</span>
            </div>
          </div>
          </div>
      <div className="order-price">
        <div className="price-info">
          <h3>₹{price*selectedQty}</h3>
          <h4>₹{price} each</h4>
        </div>
        <button className="btn" onClick={()=>deleteFromCart(id,selectedSize)}>
          <FontAwesomeIcon className="icon" icon={faTrashCan} />
         <h3>Remove</h3> 
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
