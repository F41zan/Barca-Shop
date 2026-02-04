import React, { useState, useContext, useMemo } from "react";
import "../UI/ViewOrder.scss";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../../component/Context/CardContext";
import CancelModal from "../../../component/Modals/CancelModal";
import EditModal from "../../../component/Modals/EditModal/EditModal";
import { BASE_URL } from "../../../Api/ApiCore";
import { endPoints } from "../../../Api/Urls";

const ViewOrder = () => {
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const {  orders,  } = useContext(CardContext);
  const profileInfo = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userOrder = useMemo(()=>{
    return orders.filter((order) => order.userId === user.id);
  },[orders]);

  const userFields = [
    { name: "firstName", label: "First Name", type: "text", msg: "Required" },
    { name: "lastName", label: "Last Name", type: "text", msg: "Required" },
    { name: "email", label: "Email", type: "email", msg: "Required" },
    { name: "phone", label: "Phone", type: "text", msg: "Required" },
  ];

  return (
    <div className="viewOrder">
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          fields={userFields}
          defaultValues={user}
          storageKey="user"
          apiConfig={{
            url: `${BASE_URL}${endPoints.users}`,
            idKey: "id",
            payload: (data) => ({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
            }),
          }}
        />
      )}
      {showModal && (
        <CancelModal setShowModal={setShowModal} orderId={selectedOrderId} />
      )}
      <div className="header">
        <h2 className="account">My Account</h2>
        <p>Welcome back, User</p>
      </div>
      <div className="container">
        <div className="user-wrapper">
          <div className="user">
            <div className="upper">
              <div className="icon-wrapper">
                <div className="circle">
                  <i className="ri-user-3-line"></i>
                </div>
              </div>
              <div className="info">
                <h3 className="name">{profileInfo.firstName}</h3>
                <h3 className="email">{profileInfo.email}</h3>
              </div>
              <div className="btns">
                <div className="upper-btn">
                  <button
                    onClick={() => setProfile(true)}
                    className={`${profile ? "active" : ""}`}
                  >
                    <h3>
                      <i className="ri-user-line"></i> Profile
                    </h3>
                  </button>
                  <button
                    onClick={() => setProfile(false)}
                    className={`${profile ? "" : "active"}`}
                  >
                    <h3>
                      <i className="ri-shopping-bag-4-line"></i> My Orders
                    </h3>
                    <span>{userOrder.length}</span>
                  </button>
                </div>
                <button className="logout" onClick={() => navigate("/")}>
                  <i className="ri-logout-box-r-line"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        {profile ? (
          <div className="profile-info">
            <div className="profile">
              <div className="headers">
                <h3 className="heading">Profile Information</h3>
                <button className="edit" onClick={() => setShowEditModal(true)}>
                  <i className="ri-edit-2-line"></i> Edit Profile
                </button>
              </div>
              <div className="profile-details">
                <div className="profile-content">
                  <h2 className="label">First Name</h2>
                  <h2 className="value">{profileInfo?.firstName}</h2>
                </div>
                <div className="profile-content">
                  <h2 className="label">Last Name</h2>
                  <h2 className="value">{profileInfo?.lastName}</h2>
                </div>
                <div className="profile-content email">
                  <h2 className="label">Email</h2>
                  <h2 className="value">
                    <i className="ri-mail-line"></i> {profileInfo.email}
                  </h2>
                </div>
                <div className="profile-content">
                  <h2 className="label">Phone</h2>
                  <h2 className="value">
                    <i className="ri-phone-line"></i>
                    {profileInfo?.phone}
                  </h2>
                </div>
                <div className="profile-content">
                  <h2 className="label">Created At</h2>
                  <h2 className="value">
                    <i className="ri-map-pin-line"></i>
                    {profileInfo?.createdAt}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="order-history">
            <div className="header">
              <h3>Order History</h3>
              <span>{userOrder.length} Orders</span>
            </div>
            <div className="orders-container">
              {userOrder?.map((order) => (
                <div className="order" key={order.orderId}>
                  <div className="order-status">
                    <div className="orderNo-date">
                      <h2>Order #{order.orderId}</h2>
                      <h3 className="date">
                        {order?.orderDate}. {order?.items.length} Items
                      </h3>
                    </div>
                    <div className="amt-status">
                      <span className="amt">₹{order?.pricing.totalAmount}</span>
                      <span className="status">
                        <i className="ri-error-warning-line"></i>{" "}
                        {order?.orderStatus}
                      </span>
                    </div>
                  </div>
                  {order?.items?.map((item) => (
                    <div className="ordered-items">
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
                            <div className="quantity">
                              <div className="heading">
                                <span>Qty:</span>
                              </div>
                              <div className="add-sub">
                                <span className="cnt">{item.selectedQty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="order-price">
                        <div className="price-info">
                          <h3>₹{item.price * item.selectedQty}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="user-info">
                    <div className="info">
                      <h3>
                        <strong>Shipping: </strong>{" "}
                        {order?.shippingInfo?.fullName},{" "}
                        {order?.shippingInfo?.city}
                      </h3>
                      <span className="payment">
                        <strong>Payment: </strong> COD
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrderId(order.orderId);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
