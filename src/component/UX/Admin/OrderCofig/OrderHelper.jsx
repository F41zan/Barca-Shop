export const status = [
    "Pending",
    "Processing",
    "Confirmed",
    "Cancelled",
    "Delivered",
    "Shipped",
  ];

export  const orderFields = [
    { name: "orderId", label: "Order ID", type: "text", msg: "Required" },
    { name: "userName", label: "Customer", type: "text", msg: "Required" },
    { name: "totalAmount", label: "Amount", type: "number", msg: "Required" },
    {
      name: "orderStatus",
      label: "Status",
      type: "select",
      options: ["Confirmed", "Pending", "Processing", "Cancelled"],
      msg: "Required",
    },
  ];