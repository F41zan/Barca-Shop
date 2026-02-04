import { useMemo } from "react";

const useProductStat = (products) => {
  const totalInStock = useMemo(() => {
    return products.reduce((sum, product) => Number(sum + product.quantity), 0);
  }, [products]);

  const lessStock = useMemo(() => {
    return products.filter((product) => product.quantity < 5);
  }, [products]);

  const lowStockTotal = useMemo(() => {
    return lessStock.reduce(
      (sum, product) => Number(sum + product.quantity),
      0,
    );
  }, [lessStock, products]);

  const totalPrice = useMemo(() => {
    return products.reduce((sum, product) => {
      return sum + Number(product?.price);
    }, 0);
  }, [products]);

  return { totalInStock, lessStock, lowStockTotal, totalPrice };
};

export default useProductStat;
