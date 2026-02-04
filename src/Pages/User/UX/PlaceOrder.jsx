import React, { useContext, useState } from "react";
import "../UI/PlaceOrder.scss";
import InputField from "../../../component/UX/InputField";
import ConfirmOrderModal from "../../../component/UX/ConfirmOrderModal";
import { CardContext } from "../../../component/Context/CardContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    getCartFullDetails,
    totalAmt,
    finalTotalAmt,
    tax,
    createOrder,
  } = useContext(CardContext);
  const product = getCartFullDetails;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phoneNo: "",
      streetAddress: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    },
  });

  const submitData = (data) => {
    console.log("shipping info:", data);
    createOrder(data);
    setShowModal(true);
  };

  const navigate = useNavigate();

  return (
    <>
      {showModal && <ConfirmOrderModal setShowModal={setShowModal} />}
      <div className="place-order">
        <div className="container">
          <div className="go-back" onClick={() => navigate(-1)}>
            <h1>
              <i className="ri-arrow-left-line"></i>Back to Cart
            </h1>
          </div>
          <div className="shopping-cart">
            <div className="icon-wrapper">
              <i className="ri-bank-card-line icon"></i>
            </div>
            <div className="desc">
              <h1>Checkout</h1>
              <h4>Complete your purchase</h4>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit(submitData)}>
            <div className="main-content">
              <div className="shipping-info">
                <div className="header">
                  <div className="icon-wrapper">
                    <i className="ri-map-pin-5-line"></i>
                  </div>
                  <h3>Shipping Information</h3>
                </div>
                <div className="form">
                  <InputField
                    label="Full Name"
                    type="text"
                    msg="Password is required"
                    errors={errors}
                    register={register}
                    name="fullName"
                  />
                  <div className="two-input">
                    <InputField
                      type="text"
                      label="Email Address"
                      register={register}
                      name="emailAddress"
                      msg="Password is required"
                      errors={errors}
                    />
                    <InputField
                      type="text"
                      label="Phone Number"
                      register={register}
                      name="emailAddress"
                      msg="Password is required"
                      errors={errors}
                    />
                  </div>
                  <InputField
                    type="textarea"
                    label="Street Address"
                    register={register}
                    name="streetAddress"
                    msg="Password is required"
                    errors={errors}
                  />
                  <div className="two-input">
                    <InputField
                      type="text"
                      label="City"
                      register={register}
                      name="city"
                      msg="Password is required"
                      errors={errors}
                    />
                    <InputField
                      type="text"
                      label="State"
                      register={register}
                      name="state"
                      msg="Password is required"
                      errors={errors}
                    />
                  </div>
                  <div className="two-input">
                    <InputField
                      type="text"
                      label="Pin Code"
                      register={register}
                      name="pinCode"
                      msg="Password is required"
                      errors={errors}
                    />
                    <InputField
                      type="text"
                      label="Country"
                      register={register}
                      name="country"
                      msg="Password is required"
                      errors={errors}
                    />
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <div className="header">
                  <h3>Order Summary</h3>
                </div>
                {product?.map((item) => (
                  <div className="order" key={item.id}>
                    <div className="order-info">
                      <div className="img-wrapper">
                        <img src={item.images[0]} alt="" />
                      </div>
                      <div className="about-order">
                        <div className="description">
                          <h2>{item.title}</h2>
                          <p>
                            <span>Size: {item.selectedSize}</span>
                          </p>
                        </div>
                        <div className="quantity">
                          <div className="qty">
                          <div className="heading">
                            <span>Quantity:</span>
                          </div>
                          <div className="add-sub">
                            <span className="cnt">{item.selectedQty}</span>
                          </div>
                          </div>
                          <div className="order-price">
                            <div className="price-info">
                              <h3>₹{item.price}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="amount-info">
                  <div className="amt-info">
                    <h3 className="about">Subtotal</h3>
                    <h3 className="amt">₹{totalAmt}</h3>
                  </div>
                  <div className="amt-info">
                    <h3 className="about">Shipping</h3>
                    <h3 className="free">Free</h3>
                  </div>
                  <div className="amt-info">
                    <h3 className="about">Tax(18 %)</h3>
                    <h3 className="amt">₹{tax}</h3>
                  </div>
                  <hr />
                  <div className="total-amt">
                    <h3 className="total">Total Amount</h3>
                    <h3 className="amt">₹{finalTotalAmt}</h3>
                  </div>
                  <div className="btns">
                    <button type="submit" className="checkout-btn">
                      <i className="ri-send-plane-fill"></i> Place Order (Cash
                      On Delivery){" "}
                    </button>
                    <p className="secure">
                      <i className="ri-lock-unlock-line"></i>Secure checkout. SSL
                      encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
