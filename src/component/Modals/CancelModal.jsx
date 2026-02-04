import React, { useContext, useRef } from "react";
import "./CancelModal.scss";
import { CardContext } from "../Context/CardContext";

const CancelModal = ({setShowModal,orderId}) => {
  const popUpRef = useRef();
  console.log("ordereeid::",orderId)
  const {clearOrders,removeOrder} = useContext(CardContext)
  const closePopUp = (e) =>{
    if(e.target === popUpRef.current){
        setShowModal(false);
    }
  }
  const handleRemove=(orderId)=>{
    removeOrder(orderId);
    setShowModal(false);
  }
  console.log("selectedOrderId::",orderId);
  
  return (
    <div className="cancel-modal" ref={popUpRef} onClick={closePopUp}>
      <div className={`content ${setShowModal ? "show-modal" :""}`}>
        <h2 className="header">Cancel Order?</h2>
        <h4 className="desc">Are you sure you want to cancel this order? This action cannot be undone.</h4>
        <div className="btns">
         <button className="keep" onClick={()=>setShowModal(false)}>Keep Order</button>
        
         <button className="remove" onClick={()=>handleRemove(orderId)}>Remove</button>
    
         </div>
      </div>
    </div>
  );
};

export default CancelModal;
