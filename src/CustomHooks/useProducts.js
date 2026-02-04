import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Api/ApiCore";
import { endPoints } from "../Api/Urls";
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(BASE_URL + endPoints.products);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, error, loading,setProducts };
};

export default useProducts;
