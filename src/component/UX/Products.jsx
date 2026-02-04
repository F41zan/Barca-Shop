import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CardContext } from '../Context/CardContext';
import ProductDetail from '../../Pages/User/UX/ProductDetail';

const Products = () => {
    const {productData} = useContext(CardContext);
    const params = useParams();
    const {id} = params;

    const product = productData?.find((e)=>(e.id==id));
 if (!productData || productData.length === 0) {
        return <p>Loading...</p>;
    }  
    return (
    <div>
      <ProductDetail product={product} images={product?.images} price={product.price}  title={product?.title} desc={product.description} />
    </div>
  )
}

export default Products
