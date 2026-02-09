import axios from "axios";
import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { BASE_URL } from "../../Api/ApiCore";
import { endPoints } from "../../Api/Urls";

export const CardContext = createContext(null);

const CardContextProvider = ({ children }) => {
  //  STATES 
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [promoDiscount, setPromoDiscount] = useState(null);
  const [orders, setOrders] = useState([]);

  //FETCH PRODUCTS 
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(
          BASE_URL + endPoints.products
        );
        setProductData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductData();
  }, []);

  //CART ACTIONS 
  const addToCart = (productId, size) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === productId &&
          item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        { productId, size, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === productId &&
          item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];

        if (updated[existingIndex].quantity > 1) {
          updated[existingIndex].quantity -= 1;
        } else {
          updated.splice(existingIndex, 1);
        }

        return updated;
      }

      return prev;
    });
  };

  const deleteFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size
          )
      )
    );
  };  

  const clearCart = () => {
    setCartItems([]);
  };

  // DERIVED CART DATA 
  const getCartFullDetails = useMemo(() => {
    return cartItems.map((item) => {
      const product = productData.find(
        (p) => p.id === item.productId
      );

      return {
        ...product,
        selectedQty: item.quantity,
        selectedSize: item.size,
      };
    });
  }, [cartItems, productData]);

  const productMap = useMemo(() => {
    return Object.fromEntries(
      productData.map((p) => [p.id, p])
    );
  }, [productData]);

  const totalAmt = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = productMap[item.productId];
      return (
        sum +
        (product?.price || 0) * item.quantity
      );
    }, 0);
  }, [cartItems, productMap]);

  const getTotalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  const tax = useMemo(() => {
    return (Number(totalAmt) * 18) / 100;
  }, [totalAmt]);

  const taxTotalAmt = useMemo(() => {
    return totalAmt + tax;
  }, [totalAmt, tax]);

  // PROMO CODE 
  const ApplyPromoDisc = (code) => {
    if (code !== "BARCA10" && code !== "CULES20") {
      return 0;
    }

    const percent = code === "BARCA10" ? 10 : 20;
    const discount = (taxTotalAmt * percent) / 100;

    setPromoDiscount(discount);

    return Math.max(taxTotalAmt - discount, 0);
  };

  const finalTotalAmt = useMemo(() => {
    return Math.max(taxTotalAmt - promoDiscount, 0);
  }, [taxTotalAmt, promoDiscount]);

  //ORDERS 
  const user = JSON.parse(localStorage.getItem("user") );

  const createOrder = (shippingInfo) => {
    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      shippingInfo,
      items: getCartFullDetails,
      pricing: {
        subtotal: totalAmt,
        tax,
        totalAmount: finalTotalAmt,
        discount: promoDiscount,
      },
      paymentMethod: "Cash on Delivery",
      orderStatus: "pending",
      userName: user?.firstName,
      userId: user?.id,
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const removeOrder = (id) => {
    setOrders((prev) =>
      prev.filter(
        (item) => item.orderId !== id
      )
    );
  };

  // CONTEXT VALUE  
  const contextValue = {
    productData,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getCartFullDetails,
    totalAmt,
    getTotalItems,
    tax,
    taxTotalAmt,
    ApplyPromoDisc,
    finalTotalAmt,
    createOrder,
    orders,
    setOrders,
    clearOrders,
    removeOrder,
  };

  return (
    <CardContext.Provider value={contextValue}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
