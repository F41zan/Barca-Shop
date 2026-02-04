import React, { useContext, useRef } from 'react';
import '../UI/ConfirmModal.scss';
import {useNavigate} from 'react-router-dom'
import { CardContext } from '../Context/CardContext';

const ConfirmOrderModal = ({setShowModal}) => {
    const popupRef = useRef();
    const navigate = useNavigate();
  const onClose = (e) =>{
    if(e.target==popupRef.current){
        setShowModal(false);
    }
  }
  const {getCartFullDetails,finalTotalAmt,clearCart} = useContext(CardContext);
  const cartData = getCartFullDetails;
  const handleView = () =>{
    navigate('/viewOrder');
    clearCart();
  }
  const handleShopping = () =>{
    navigate('/kits')
    clearCart();
  }
  return (
    <div className='overlay' onClick={onClose} ref={popupRef} >
      <div className="modal" >
        <div className="modal-content">
            <div className="confirmed">
                <div className="upper">
                <i className="ri-checkbox-circle-fill"></i>
                <h3>Order Confirmed!</h3>
                <h4>Thank you for your purchase</h4>
                <h5>Order ID : FHDJSKLAFJDKLHFJDKSLFD</h5>
                </div>  
            <div className="order-info">
                <div className="features">
                    <i className="ri-truck-line"></i>
                    <div className="desc">
                        <h3 className="info-head">Cash on Delivery</h3>
                        <h3 className="info">Pay When Delivered</h3>
                    </div>
                </div>
                <div className="features">
                    <i className="ri-shopping-bag-3-line"></i>
                    <div className="desc">
                        <h3 className="info-head">{cartData.length} Items </h3>
                        <h3 className="info">In your order</h3>
                    </div>
                </div>
                <div className="features">
                    <i className="ri-money-rupee-circle-fill"></i>
                    <div className="desc">
                        <h3 className="info-head">₹{finalTotalAmt}</h3>
                        <h3 className="info">Total Amount</h3>
                    </div>
                </div>
            </div>
                <div className="btns">
                    <button className="view" onClick={handleView}> View Your Orders</button>
                    <button className="shopping" onClick={handleShopping}>Continue Shopping</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrderModal
