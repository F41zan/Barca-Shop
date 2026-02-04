import axios from "axios";
import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { BASE_URL } from "../../Api/ApiCore";
import { endPoints } from "../../Api/Urls";
import useUsers from "../../CustomHooks/useUser";

export const CardContext = createContext(null);

const CardContextProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [orders, setOrders] = useState([]);
  const { users } = useUsers();
  // console.log("users: ", users);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // console.log("API URL:", `${BASE_URL}products`);
        const res = await axios.get(BASE_URL + endPoints.products);
        const data = res.data;
        setProductData(data);
        // console.log("statteproduct", productData);
        // console.log("res", res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchProductData();
  }, []);

  const addToCart = (productId, size) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { quantity: 1, productId, size }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.size === size
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
        (item) => !(item.productId == productId && item.size === size)
      )
    );
  };

  const getCartFullDetails = useMemo(() => {
    return cartItems.map((item) => {
      const product = productData.find(
        (productItem) => productItem.id === item.productId
      );
      return {
        ...product,
        selectedQty: item.quantity,
        selectedSize: item.size,
      };
    });
  }, [cartItems, productData]);

  const productMap = useMemo(() => {
    return Object.fromEntries(productData.map((p) => [p.id, p]));
  }, [productData]);

  const totalAmt = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = productMap[item.productId];
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  }, [cartItems, productMap]);

  const getTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);
  const tax = useMemo(() => (Number(totalAmt) * 18) / 100, [totalAmt]);
  const taxTotalAmt = useMemo(() => totalAmt + tax, [totalAmt, tax]);

  const clearCart = () => {
    setCartItems([]);
  };

  const ApplyPromoDisc = (code) => {
    if (code !== "BARCA10" && code !== "CULES20") {
      setPromoDiscount(0);
      return 0;
    }
    const percent = code === "BARCA10" ? 10 : 20;
    const discount = (taxTotalAmt * percent) / 100;
    // console.log("discoutn::", discount);
    setPromoDiscount(discount);
    const finalTotal = Math.max(taxTotalAmt - discount, 0);
    // console.log("finaltotal", finalTotal);
    return finalTotal;
  };

  const finalTotalAmt = useMemo(() => {
    return Math.max(taxTotalAmt - promoDiscount, 0);
  }, [taxTotalAmt, promoDiscount]);

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("userFirstname", user.firstName);
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
      userName: user.firstName,
      userId: user.id,
    };
    setOrders([...orders, newOrder]);
  };



  const clearOrders = () => {
    setOrders([]);
  };
  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((item) => item.orderId !== id));
  };
  // // console.log("usersWithOrders", usersWithOrders);

  const contextValue = {
    productData,
    removeFromCart,
    addToCart,
    getCartFullDetails,
    deleteFromCart,
    totalAmt,
    getTotalItems,
    tax,
    taxTotalAmt,
    clearCart,
    ApplyPromoDisc,
    finalTotalAmt,
    createOrder,
    orders,
    setOrders,
    clearOrders,
    removeOrder,
 
  };

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};

export default CardContextProvider;
