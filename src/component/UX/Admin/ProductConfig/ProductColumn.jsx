import ColumnActionBtn from "../../../UX/Admin/ColumnActionBtn"

 const columns = (handleEdit,handleDelete)=> [
    {
      label: "PRODUCT",
      render: (product) => (
        <div className="product-cell">
          <img
            src={product?.images[0]} // or product.thumbnail / product.imageUrl
            alt={product?.title}
            className="product-img"
          />
          <span className="product-title">{product?.title}</span>
        </div>
      ),
    },

    {
      label: "COLLECTION",
      key: "category",
    },
    {
      label: "CATEGORY",
      key: "type",
    },
    {
      label: "PRICE",
      key: "price",
    },
    {
      label: "STOCK",
      key: "quantity",
    },
    // {
    //   label: "STOCK",
    //   render:(product)=>(
    //     {product.quantity}
    //     <div className="stock-colors">
    //     </div>
    //   )
    // },
    {
      label: "GENDER",
      key: "gender",
    },

    {
      label: "Actions",
      render: (product) => (
        <ColumnActionBtn handleEdit={() => handleEdit(product)} handleDelete={() => handleDelete(product.id)} />
      ),
    },
  ];

  export default columns