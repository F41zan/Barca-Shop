import React, { useEffect, useState, useRef, useContext } from "react";
import "../UI/ProductCollection.scss";
import CollectionCard from "../../../component/UX/CollectionCard";
import { CardContext } from "../../../component/Context/CardContext";

const ProductCollection = ({ category }) => {
  const [showFilter, setShowFilter] = useState(false);
  const categoryOptions = {
    kits: ["Home Kit", "Away Kit", "GoalKeeper Kit", "Training Kit"],
    Apparel: ["Hoodie", "Pants", "Jackets", "T-Shirts", "Shorts"],
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const { productData } = useContext(CardContext);
  const [selectedType, setSelectedType] = useState("All Categories");
  const [selectedGender, setSelectedGender] = useState("All Genders");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [appliedFilter, setAppliedFilter] = useState({
    type: selectedType,
    search: "",
    gender: selectedGender,
  });
  const isMobile = window.innerWidth < 1000;
  useEffect(() => {
    if (!isMobile) {
      setAppliedFilter({
        type: selectedType,
        gender: selectedGender,
        search: searchText,
      });
      setShowDropdown(false);
    }
  }, [selectedGender, selectedType, searchText]);
  const handleApplyFilters = () => {
    setAppliedFilter({
      type: selectedType,
      gender: selectedGender,
      search: searchText,
    });
    setShowFilter(false);
  };

  const handleDropdown = (openDropdown) => {
    setShowDropdown(showDropdown === openDropdown ? null : openDropdown);
  };
  const dropDownRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) {
        setShowFilter(false);
      }
    });
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const filteredProducts = productData
    ?.filter((item) => {
      if (item.category.toLowerCase() !== category.toLowerCase()) return false;

      if (
        appliedFilter.type !== "All Categories" &&
        item.type.toLowerCase() !== appliedFilter.type.toLowerCase()
      )
        return false;

      if (
        appliedFilter.gender !== "All Genders" &&
        item.gender.toLowerCase() !== appliedFilter.gender.toLowerCase()
      )
        return false;
      if (
        searchText &&
        !item.title.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high")
        return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "high-to-low")
        return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });

  const clearFilter = () => {
    setSelectedType("All Categories");
    setSelectedGender("All Genders");
    setSortBy(null);
    setSearchText("");
  };

  const handleCategorySelect = (type) => {
    setSelectedType(type);
    setShowDropdown(false);
  };

  return (
    <div className="product-collection">
      <div className="collection-hero">
        <h1> {category === "kits" ? "KITS" : "APPAREL"}</h1>
      </div>
      <hr />
      <div
        className={`filters ${showFilter ? "show-filter" : ""}`}
        ref={dropDownRef}
      >
        <div className="mob-filter" onClick={() => setShowFilter(true)}>
          <h3>Filter And Sort</h3>
        </div>
        <div className={`filter-options ${showFilter ? "show-filter" : ""}`}>
          {showFilter && (
            <div className="mob-filter-header">
              <div className="head">
                <h3>Filter And Sort</h3>
              </div>{" "}
              <i
                onClick={() => setShowFilter(false)}
                className="ri-close-line  cancel-filter"
              ></i>
            </div>
          )}
          <div className="search">
            <input
              type="text"
              placeholder="Search ..."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <i className="ri-search-line"></i>
          </div>
          <div
            className="dropList"
            onClick={() => handleDropdown("categories")}
            ref={dropDownRef}
          >
            <h3>
              {selectedType} <i className="ri-arrow-down-s-line"></i>
            </h3>
            <div className="dropDown">
              <ul className={`${showDropdown === "categories" ? "show" : ""}`}>
                {categoryOptions[category].map((cat, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      handleCategorySelect(cat);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="dropList"
            onClick={() => handleDropdown("gender")}
            ref={dropDownRef}
          >
            <h3>
              {selectedGender} <i className="ri-arrow-down-s-line"></i>
            </h3>
            <div className="dropDown">
              <ul className={`${showDropdown === "gender" ? "show" : ""}`}>
                <li
                  onClick={() => {
                    setSelectedGender("Men");
                  }}
                >
                  Men
                </li>
                <li
                  onClick={() => {
                    setSelectedGender("Women");
                  }}
                >
                  Women
                </li>
                <li
                  onClick={() => {
                    setSelectedGender("Kids");
                  }}
                >
                  {" "}
                  Kids
                </li>
              </ul>
            </div>
          </div>
          <div
            className="dropList"
            onClick={() => handleDropdown("sort")}
            ref={dropDownRef}
          >
            <h3>
              Sorts by <i className="ri-arrow-down-s-line"></i>
            </h3>
            <div className="dropDown">
              <ul className={`${showDropdown === "sort" ? "show" : ""}`}>
                <li
                  onClick={() => {
                    setSortBy("low-to-high");
                  }}
                >
                  Price: Low <i className="ri-arrow-right-line"></i> High
                </li>
                <li
                  onClick={() => {
                    setSortBy("high-to-low");
                  }}
                >
                  Price: High <i className="ri-arrow-right-line"></i> Low
                </li>
              </ul>
            </div>
          </div>
          <div className="filter-btn">
            <h4 className="clear" onClick={clearFilter}>
              Clear Filters
            </h4>
            {isMobile && (
              <button className="apply" onClick={handleApplyFilters}>
                Apply Filters
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="downhr" />
      <div className="Collection-container">
        <div className="collection-card">
          {filteredProducts.length ? (
            filteredProducts.map((item) => {
              return <CollectionCard item={item} key={item.id} />;
            })
          ) : (
            <div className="no-product">
              <h3>No Products Found</h3>
              <p>Try changing filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
