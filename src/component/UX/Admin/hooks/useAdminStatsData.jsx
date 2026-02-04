import { useContext, useMemo } from "react";
import { CardContext } from "../../../Context/CardContext";
import useProducts from "../../../../CustomHooks/useProducts";
import useUsers from "../../../../CustomHooks/useUser";

const useAdminStatsData = () => {
  const { orders } = useContext(CardContext);
  const { users } = useUsers();
  const TotalOrderPrice = useMemo(() => {
    return orders.reduce((sum, item) => sum + item.pricing.totalAmount, 0);
  }, [orders]);
  const pendingOrder = useMemo(() => {
    return orders.filter((item) => item.orderStatus == "pending");
  }, [orders]);

  const { products } = useProducts();

  const deliverOrder = useMemo(() => {
    return orders.filter(
      (order) => order.orderStatus.toLowerCase() === "delivered",
    );
  }, [orders]);

  const onlyUser = useMemo(() => {
    return users.filter((user) => user.role == "user");
  }, [users]);

  const activeUser = useMemo(() => {
    return users.filter((user) => user.status.toLowerCase() === "active");
  }, [users]);

  const stockCount = useMemo(() => {
    return products.reduce((sum, item) => sum + Number(item.quantity), 0);
  }, [products]);

  const lowStock = useMemo(() => {
    return products.reduce((sum, item) => {
      if (item.quantity < 5) {
        return sum + Number(item.quantity);
      }
      return sum;
    }, 0);
  }, [products]);
  const outOfStock = useMemo(() => {
    return products.filter((item) => Number(item.quantity) == 0);
  }, [products]);
  return {
    TotalOrderPrice,
    pendingOrder,
    deliverOrder,
    onlyUser,
    activeUser,
    stockCount,
    lowStock,
    outOfStock,
  };
};

export default useAdminStatsData;
