import { useEffect, useRef, useState } from "react";
import "../UI/User.scss";
import axios from "axios";
import { BASE_URL } from "../../../Api/ApiCore";
import { endPoints } from "../../../Api/Urls";
import EditModal from "../../../component/Modals/EditModal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faArrowTrendUp,
  faArrowTrendDown,
  faIndianRupeeSign,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AddData from "../../../component/Modals/AddData/AddData";
import Table from "../../../component/UX/Table";
import InfoCard from "../../../component/UX/Admin/InfoCard";
import useProducts from "../../../CustomHooks/useProducts";
import columns from "../../../component/UX/Admin/ProductConfig/ProductColumn";
import useProductStat from "../../../component/UX/Admin/hooks/useProductStat";
const AdminProducts = () => {
  const { products, setProducts } = useProducts();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [filter, setFilter] = useState({
    status: "All Status",
    category: "All Category",
    price: "All Prices",
    gender: "All Gender",
    sort: "",
  });
  const [showDropdown, setShowDropdown] = useState();
  const handleDropdown = (type) => {
    setShowDropdown((prev) => (prev === type ? null : type));
  };

  const handleGender = (chosenGender) => {
    setFilter((prev) => ({ ...prev, gender: chosenGender }));
  };
  const handleCategory = (chosenCategory) => {
    setFilter((prev) => ({ ...prev, category: chosenCategory }));
  };
  const handlePrice = (choosenPrice) => {
    setFilter((prev) => ({ ...prev, price: choosenPrice }));
  };
  const handleSort = (choosenSort) => {
    setFilter((prev) => ({ ...prev, sort: choosenSort }));
  };

  const genderOptions = ["Men", "Women", "Kids"];
  const categories = ["Kits", "Apparel"];
  const productStats = useProductStat(products);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredProducts = products
    .filter((product) => {
      if (searchFilter) {
        const match =
          product.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
          product.type.toLowerCase().includes(searchFilter.toLowerCase()) ||
          product.gender.toLowerCase().includes(searchFilter.toLowerCase()) ||
          product.title.toLowerCase().includes(searchFilter.toLowerCase());

        if (!match) return false;
      }

      // if (filter.status!="All Status" && filter.status!=product.quantity) return false
      if (filter.price != "All Prices") {
        const [min, max] = filter.price.split("-").map(Number);
        if (Number(product.price) < min || Number(product.price) > max)
          return false;
      }
      if (
        filter.gender != "All Gender" &&
        filter.gender.toLowerCase() != product.gender.toLowerCase()
      )
        return false;
      if (
        filter.category != "All Category" &&
        filter.category.toLowerCase() != product.category.toLowerCase()
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (filter.sort === "Low-High") {
        return a.price - b.price;
      } else if (filter.sort === "High-Low") {
        return b.price - a.price;
      }
      return 0;
    });

  const priceRef = useRef();
  const genderRef = useRef();
  const categoryRef = useRef();
  const sortRef = useRef();

  useEffect(() => {
    const handleClickOutsideRef = (e) => {
      if (showDropdown === "price" && priceRef.current) {
        if (!priceRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }
      if (showDropdown === "gender" && genderRef.current) {
        if (!genderRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }
      if (showDropdown === "category" && categoryRef.current) {
        if (!categoryRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }
      if (showDropdown === "sort" && sortRef.current) {
        if (!sortRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutsideRef);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideRef);
  }, [showDropdown]);

  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
    setCurrentPage(1);
    // setItemsPerPage(40);
  };

  //pagination
  const data = filteredProducts;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const showAllEntry = (entry) => {
    setItemsPerPage(entry);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  //deleting particular data
  const handleDelete = async (productId) => {
    await axios.delete(`${BASE_URL + endPoints.products}/${productId}`);
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  //Editing:
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditSuccess = (updateProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id == updateProduct.id
          ? { ...product, ...updateProduct }
          : product,
      ),
    );
  };

  const productFields = [
    { name: "title", label: "Product Name", type: "text", msg: "Required" },
    { name: "category", label: "Collection", type: "text", msg: "Required" },
    { name: "type", label: "Category", type: "text", msg: "Required" },
    { name: "gender", label: "Gender", type: "text", msg: "Required" },
    { name: "price", label: "Price", type: "number", msg: "Required" },
    { name: "quantity", label: "Quantity", type: "number", msg: "Required" },
  ];

  return (
    <div className="admin-user">
      {showAddModal && (
        <AddData
          setShowAddModal={setShowAddModal}
          fields={productFields}
          apiConfig={{
            url: BASE_URL + endPoints.products,
          }}
          onSuccess={(newUser) => {
            setProducts((prev) => [...prev, newUser]);
          }}
        />
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          fields={productFields}
          defaultValues={selectedProduct}
          onSuccess={handleEditSuccess}
          apiConfig={{
            url: BASE_URL + endPoints.products,
            idKey: "id",
            payload: (data) => ({
              id: selectedProduct.id,
              price: data.price,
              gender: data.gender,
              title: data.title,
              type: data.type,
              category: data.category,
              quantity: data.quantity,
            }),
          }}
        />
      )}
      <div className="user-content">
        <div className="head">
          <h3>Product Management</h3>
          <p>Manage System products and their permissions</p>
        </div>
        <div className="user-info">
          <InfoCard
            title="Total products"
            icon={<FontAwesomeIcon icon={faBoxOpen} />}
            dataNo={products.length}
            bgc="#D7E7FF"
            color="#265baa"
            flexEnd
          />
          <InfoCard
            title="In Stock"
            icon={<FontAwesomeIcon icon={faArrowTrendUp} />}
            dataNo={productStats.totalInStock}
            bgc="#D7FBE7"
            color="#4ca072"
            flexEnd
          />
          <InfoCard
            title="Low Stock"
            icon={<FontAwesomeIcon icon={faArrowTrendDown} />}
            dataNo={productStats.lowStockTotal}
            bgc="#FFF7B8"
            color="#c7b217"
            flexEnd
          />
          <InfoCard
            title="Inventory Value"
            icon={<FontAwesomeIcon icon={faIndianRupeeSign} />}
            dataNo={productStats.totalPrice.toLocaleString("en-IN")}
            bgc="#F2E4FE"
            color="#9852d5"
            flexEnd
          />
        </div>

        <div className="table-wrapper">
          <div className="table-upper">
            <div className="filter">
              <input
                type="text"
                placeholder="Search users by name, category, gender, or collection..."
                onChange={(e) => handleSearch(e)}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>

            <div className="upper-right">
              <div
                className="filter-options"
                onClick={() => {
                  handleDropdown("gender");
                }}
                ref={genderRef}
              >
                <h3>{filter.gender}</h3>
                <ul
                  className={`${showDropdown === "gender" ? "show-option" : ""}`}
                >
                  <li onClick={() => handleGender("All Gender")}>All Gender</li>
                  {genderOptions.map((g) => (
                    <li key={g} onClick={() => handleGender(g)}>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="filter-options"
                onClick={() => {
                  handleDropdown("category");
                }}
                ref={categoryRef}
              >
                <h3>{filter.category}</h3>
                <ul
                  className={`${showDropdown === "category" ? "show-option" : ""}`}
                >
                  <li onClick={() => handleCategory("All Category")}>
                    All Collection
                  </li>
                  {categories.map((g) => (
                    <li key={g} onClick={() => handleCategory(g)}>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="filter-options"
                onClick={() => {
                  handleDropdown("price");
                }}
                ref={priceRef}
              >
                <h3>{filter.price}</h3>
                <ul
                  className={`${showDropdown === "price" ? "show-option" : ""}`}
                >
                  <li onClick={() => handlePrice("All Prices")}>All Prices</li>
                  <li onClick={() => handlePrice("0-2000")}>0-2000</li>
                  <li onClick={() => handlePrice("2000-5000")}>2000-5000</li>
                  <li onClick={() => handlePrice("5000-10000")}>5000-10000</li>
                </ul>
              </div>
              <div
                className="filter-options"
                onClick={() => {
                  handleDropdown("sort");
                }}
                ref={sortRef}
              >
                <h3>{filter.sort === "" ? "Sort" : `${filter.sort}`}</h3>
                <ul
                  className={`${showDropdown === "sort" ? "show-option" : ""}`}
                >
                  <li onClick={() => handleSort("")}>Default</li>
                  <li onClick={() => handleSort("Low-High")}>Low - High</li>
                  <li onClick={() => handleSort("High-Low")}>High - Low</li>
                </ul>
              </div>

              <div className="add-new" onClick={() => setShowAddModal(true)}>
                <button className="new-user">+ New Product</button>
              </div>
            </div>
          </div>
          <div className="table-container">
            <Table
              columns={columns(handleEdit, handleDelete)}
              data={paginatedData}
            />
          </div>
          <div className="table-footer">
            <div className="show-entries">
              <span className="show-label">Show</span>
              <select
                className="entries-select"
                onChange={(e) => showAllEntry(Number(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="50">50</option>
              </select>
              <span className="entries-label">Entries</span>
            </div>
            <div className="pagination">
              <button
                className="pagination-btn prev"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>

              <span className="page-indicator">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <button
                className="pagination-btn next"
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
