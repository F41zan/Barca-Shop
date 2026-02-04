import { useContext } from "react";
import "../UI/CartDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import InputField from "../../../component/UX/InputField";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../../component/Context/CardContext";
import OrdersCard from "../../../component/UX/OrdersCard";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const CartDetails = () => {
  const navigate = useNavigate();
  const {
    getCartFullDetails,
    totalAmt,
    getTotalItems,
    tax,
    clearCart,
    ApplyPromoDisc,
    finalTotalAmt
  } = useContext(CardContext);
  const cartProducts = getCartFullDetails;
  console.log("cartPrdoucts", cartProducts);
  console.log("tax", tax);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      promoCode: "",
    },
  });
  
  const notify = (code) =>{
    if(!cartProducts.length){
      console.log("checking");
      toast.error("first add item to cart",{ autoClose: 1500, style: { fontSize: "17px", fontFamily: "outfit" } })
    }
    else{
      toast.success(
        `🎉${
          code === "BARCA10" ? "BARCA10" : "CULES20"
        } applied 10% discount everyday`,
        { autoClose: 1500, style: { fontSize: "15px", fontFamily: "outfit" } }
      );
    }
  }
  const handleNavigate = ()=>{
    if(cartProducts.length>0){
      navigate('/placeOrder')
    }
    notify(); 
  }
  const onSubmitPromo = (data) => {
    if(!cartProducts.length){
      toast.error("first add item to cart",{ autoClose: 1500, style: { fontSize: "17px", fontFamily: "outfit" } })
      return ;
    }
    console.log("data", data);
    const code = data.promoCode.toUpperCase();
    console.log("code:::::",code);
      const finalAmt = ApplyPromoDisc(code); 
      if(finalAmt!==0){
        clearErrors("promocode");
        notify(code);
        reset()
      }
     else {
      setError("promoCode", {
        type: "manual",
        message: "Invalid promo code. Try BARCA10 or CULES20",
      });
    }
  };
  return (
    <div className="cartDetails">
      <div className="container">
        <div className="go-back">
          <h1 onClick={() => navigate('/Kits')}>
            <i className="ri-arrow-left-line"></i>Continue Shopping
          </h1>
        </div>
        <div className="shopping-cart">
          <div className="icon-wrapper">
            <i className="ri-shopping-cart-line"></i>
          </div>
          <div className="desc">
            <h1>Shopping Cart</h1>
            <h4>Fc Barcelona Official Store</h4>
          </div>
        </div>
        <div className="order-container">
          <div className="left-container">
            <div className="cart-orders">
              <div className="left">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faCube} className="icon" />
                </div>
                <div className="desc">
                  <h1>{cartProducts.length} Items in Cart</h1>
                  <h4>Fc Barcelona X New Era</h4>
                </div>
              </div>
              <div className="right">
                <h3 className="logo">VISCA BARÇA!</h3>
                <div className="wrap">
                  <div className="blue-circle"></div>
                  <div className="red-circle"></div>
                </div>
              </div>
            </div>
            <div className={cartProducts.length>0?"show-orders":"no-order"}>
              {cartProducts.length>0 ? (
                cartProducts?.map((item) => (
                <OrdersCard item={item} key={item.id} />
              ))
              ) : (
                <div className="empty-cart">
                  <div className="empty-content">
                    <h3 className="desc">Your cart is empty</h3>
                    <button className="shopping" onClick={()=>{navigate('/Kits')}}>Continue Shopping <i class="ri-arrow-right-line"></i></button>
                  </div>
                </div>
              )
            }
              
            </div>
          </div>
          <div className="right-container">
            <div className="header">
              <div className="icon-wrapper">
                <i className="ri-price-tag-3-line"></i>
              </div>
              <h3>Order Summary</h3>
            </div>
            <div className="invoice-info">
              <div className="amt-info">
                <h3 className="about">
                  Subtotal ({cartProducts.length} items) :{" "}
                </h3>
                <h3 className="amt">₹{totalAmt}</h3>
              </div>
              <div className="amt-info">
                <h3 className="about"> Total Quantity : </h3>
                <h3 className="amt">{getTotalItems}</h3>
              </div>

              <div className="amt-info">
                <h3 className="about">Shipping (2 items) : </h3>
                <h3 className="free">Free</h3>
              </div>
              <div className="amt-info">
                <h3 className="about">Tax (18 %) : </h3>
                <h3 className="amt">₹{tax}</h3>
              </div>
              <hr />
              <div className="total-amt">
                <h3 className="total">Total Amount</h3>
                <h3 className="amt">₹{finalTotalAmt}</h3>
              </div>
              <div className="promo-code">
                <h4>Discount Code</h4>
                <div className="barcode">
                  <form onSubmit={handleSubmit(onSubmitPromo)} action="">
                    <InputField
                      label="Enter Promo Code"
                      type="text"
                      name="promoCode"
                      register={register}
                      errors={errors}
                      validation={{
                        required: "Please enter a promo code",
                      }}
                    />
                    <button className="apply-btn">Apply</button>
                  </form>
                </div>
                <p>
                  Try: <strong>BarXX10</strong> (10% off) or{" "}
                  <strong>CulXXX20</strong> (20% off)
                </p>
              </div>
              <div className="checkout-clear">
                <button
                  className="checkout-btn"
                  onClick={handleNavigate}
                >
                  <i className="ri-bank-card-line icon"></i> Proceed to Checkout{" "}
                  <i className="ri-arrow-right-line right-icon"></i>
                </button>
                <button className="clear-btn" onClick={clearCart}>
                  <FontAwesomeIcon className="icon" icon={faTrashCan} />
                  Clear Entire Cart
                </button>
              </div>
              <hr />
              <div className="invoice-footer">
                <h3>
                  <FontAwesomeIcon icon={faCircle} className="icon-green" />
                  Secure Checkout
                </h3>
                <h3>
                  <FontAwesomeIcon icon={faCircle} className="icon" />
                  SSL Encrypted
                </h3>
                <h3>
                  <FontAwesomeIcon icon={faCircle} className="icon" />
                  Free Returns
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
