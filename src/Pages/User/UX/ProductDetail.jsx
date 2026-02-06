import React, { useState, useEffect, useContext, useMemo } from "react";
import "../UI/ProductDetails.scss";
import CollectionCard from "../../../component/UX/CollectionCard";
import { CardContext } from "../../../component/Context/CardContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = ({ product }) => {
  const { title, images, description, price, quantity, id } = product;
  const { addToCart } = useContext(CardContext);
  const [activeImg, setActiveImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { productData } = useContext(CardContext);

  useEffect(()=>{
    setSelectedSize("");
    setShowSuccess("");
  },[id]);
  const currentProduct = useMemo(() => {
    return productData.find((product) => product.id === id);
  }, [productData, id]);

  const relatedProducts = useMemo(() => {
    if (!currentProduct) return [];

    const products = productData
      .filter((product) => product.id !== currentProduct.id)
      .map((product) => {
        let priority = 0;

        // Priority 1: Same type AND same category
        if (
          product.type === currentProduct.type &&
          product.category === currentProduct.category
        ) {
          priority = 3;
        }
        // Priority 2: Same type only
        else if (product.type === currentProduct.type) {
          priority = 2;
        }
        // Priority 3: Same category only
        else if (product.category === currentProduct.category) {
          priority = 1;
        }

        return { ...product, priority };
      })
      .filter((product) => product.priority > 0)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 4);

    return products;
  }, [productData, currentProduct]);

  useEffect(() => {
    if (images?.length) {
      setActiveImg(images[0]);
    }
  }, [images]);

  const notify=()=>{
    toast.success(" Added to cart successfully!",{autoClose:1500,style:{fontFamily:"outfit"}});
  }
  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Don't forget to select your size!");
      return;
    }
    addToCart(id, selectedSize);
    setError("");
    notify();
    setShowSuccess(true);
  };

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="left">
          <div className="product-list-img">
            {images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={img}
                onClick={() => {
                  setActiveImg(img);
                }}
                className={img == activeImg ? "border-active" : ""}
              />
            ))}
          </div>
          <div className="main-img">
            <img src={activeImg} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="right-container">
            <div className="sm-header">Home kit</div>
            <div className="heading">
              <h3>{title}</h3>
              <div className="price-quantity">
                <span className="price"> ₹{price}</span>
                {quantity < 5 && <span className="quantity">Limited Stock</span>}
              </div>
              <div className="description">
                <p>{description}</p>
              </div>
            </div>
            <div className="size">
              <div className="select-guide">
                <span className="select">Select Size:</span>
                <span className="guide">Size Guide</span>
              </div>
              <div className={`all-sizes ${error && "error-sizes"}`}>
                {product?.sizes?.map((size) => (
                  <div
                    key={size}
                    className={`size-no ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedSize(size);
                      setError("");
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>
                {error && <p className="error-msg">{error}</p>}
            </div>
            <div className="advantages">
              <h3>
                <i className="ri-truck-line"></i> Free Shipping
              </h3>
              <h3>
                <i className="ri-shield-line"></i>2 Year Warranty
              </h3>
              <h3>
                <i className="ri-recycle-line"></i>Easy Returns
              </h3>
            </div>
            <button
              onClick={
                showSuccess ? () => navigate("/cartOrder") : handleAddToCart
              }
              className={`add-to-cart ${showSuccess ? "go-to-cart" : ""}`}
            >
              {showSuccess ? (
                "✓ Go To Cart"
              ) : (
                <p>
                  <i className="ri-shopping-bag-line"></i> Add To Cart
                </p>
              )}
            </button>
            
            <hr />
            <div className="product-info">
              <div className="info">
                <h3>Product Id:</h3> <span>#{id}</span>
              </div>
              <div className="info">
                <h3>Material:</h3> <span>Recyclable</span>
              </div>
              <div className="info">
                <h3>Care:</h3> <span>Machine Wash</span>
              </div>
              <div className="info">
                <h3>Stock:</h3> <span>{quantity} Unit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="header">
          <h1>Complete Your Look </h1>
          <p>Fans who bought this item also loved these matching products</p>
        </div>
        <div className="matching-cards">
          {relatedProducts.map((item) => (
            <CollectionCard
              key={item.id}
              item={item}
              image={item.images}
              id={item.id}
              desc={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
