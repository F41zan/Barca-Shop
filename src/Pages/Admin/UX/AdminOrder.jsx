import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "../UI/User.scss";
import useorders from "../../../CustomHooks/useUser";
import { CardContext } from "../../../component/Context/CardContext";
import axios from "axios";
import { BASE_URL } from "../../../Api/ApiCore";
import { endPoints } from "../../../Api/Urls";
import EditModal from "../../../component/Modals/EditModal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faRepeat,
  faCircleCheck,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../../component/UX/Table";
import InfoCard from "../../../component/UX/Admin/InfoCard";
import OrderColumn from "../../../component/UX/Admin/OrderCofig/OrderColumn";
import { status,orderFields } from "../../../component/UX/Admin/OrderCofig/OrderHelper";

const AdminOrder = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const { orders, setOrders } = useContext(CardContext);

  const totalItems = orders.reduce(
  (total, order) =>
    total +
    order.items.reduce((sum, item) => sum + Number(item.selectedQty), 0),
  0
);
;
  const pendingOrder = orders.filter(
    (order) => order.orderStatus.toLowerCase() === "pending",
  );
  const ShippedOrder = orders.filter(
    (order) => order.orderStatus.toLowerCase() === "shipped",
  );
  const confirmOrder = orders.filter(
    (order) => order.orderStatus.toLowerCase() === "confirmed",
  );
  const deliverOrder = orders.filter(
    (order) => order.orderStatus.toLowerCase() === "delivered",
  );
  const totalRevenue = orders.reduce(
    (sum, order) => Number(sum + order.pricing.totalAmount),
    0,
  );
  const [currentPage, setCurrentPage] = useState(1); // Start at page 1
  const [itemsPerPage, setItemsPerPage] = useState(5); // Show 5 items per page
  const [searchFilter, setSearchFilter] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusRef = useRef();
  const [showDropdown, setShowDropdown] = useState();
  const handleDropdown = (type) => {
    setShowDropdown((prev) => (prev === type ? null : type));
  };
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown === "status" && statusRef.current) {
        if (!statusRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const filteredOrder = orders.filter((userOrders) => {
    if (searchFilter) {
      const match =
        userOrders.userName
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        userOrders.pricing.totalAmount
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        userOrders.orderStatus
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        userOrders.item.includes(searchFilter.toLowerCase());

      if (!match) return false;
    }

    if (
      selectedStatus !== "All Status" &&
      selectedStatus.toLowerCase() !== userOrders.orderStatus.toLowerCase()
    )
      return false;

    return true;
  });

  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
    setCurrentPage(1);
    // setItemsPerPage(40);
  };

  //pagination
  const data = filteredOrder;
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

  //   //deleting particular data
  const handleDelete = async (orderId) => {
    setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
  };

  //Editing:
  const handleEdit = (order) => {
    setSelectedOrder({
      ...order,
      totalAmount: order.pricing?.totalAmount,
    });
    setShowEditModal(true);
  };

  const handleEditSuccess = (updateUser) => {
    setOrders((prev) =>
      prev.map((user) =>
        user.id == updateUser.id ? { ...user, ...updateUser } : user,
      ),
    );
  };

 
  const handleStatus = (orderId, orderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, orderStatus } : order,
      ),
    );
  };

  return (
    <div className="admin-user">
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          fields={orderFields}
          defaultValues={selectedOrder}
          onSuccess={handleEditSuccess}
          apiConfig={{
            url: BASE_URL + endPoints.orders,
            idKey: "id",
            payload: (data) => ({
              id: selectedOrder.id,
              orderId: data.orderId,
              userName: data.userName,
              totalAmount: data.totalAmount,
              orderStatus: data.orderStatus,
              pricing: {
                ...selectedOrder.pricing,
                totalAmount: data.totalAmount,
              },
            }),
          }}
        />
      )}
      <div className="user-content">
        <div className="head">
          <h3>Order Management</h3>
          <p>Manage System orders and their permissions</p>
        </div>
        <div className="user-info">
          <InfoCard
            title="Total orders"
            icon={<FontAwesomeIcon icon={faBoxOpen} />}
            desc={`${totalItems} items`}
            dataNo={orders.length}
            bgc="#D7E7FF"
            color="#265baa"
          />
          <InfoCard
            title="Pending orders"
            icon={<FontAwesomeIcon icon={faRepeat} />}
            desc={`${confirmOrder.length} confirmed`}
            dataNo={pendingOrder.length}
            bgc="#FFF7B8"
            color="#c7b217"
          />
          <InfoCard
            title="Delivered"
            icon={<FontAwesomeIcon icon={faCircleCheck} />}
            desc={`${ShippedOrder.length} shipped`}
            dataNo={deliverOrder.length}
            bgc="#D7FBE7"
            color="#4ca072"
          />
          <InfoCard
            title="Total Revenue"
            icon={<FontAwesomeIcon icon={faDownload} />}
            dataNo={totalRevenue}
            bgc="#F2E4FE"
            color="#9852d5"
            desc="All orders"
          />
        </div>

        <div className="table-wrapper">
          <div className="table-upper">
            <div
              className="filter-options"
              ref={statusRef}
              onClick={() => handleDropdown("status")}
            >
              <h3>{selectedStatus}</h3>
              <ul
                className={`${showDropdown === "status" ? "show-option" : ""}`}
              >
                <li onClick={() => handleStatusClick("All Status")}>
                  All Status
                </li>
                {status.map((s) => (
                  <li key={s} onClick={() => handleStatusClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter">
              <input
                type="text"
                placeholder="Search by OrderId, Status, Customer or Amount...."
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className="upper-right"></div>
          </div>
          <div className="table-container">
            <Table
              columns={OrderColumn(handleEdit, handleDelete, handleStatus)}
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

export default AdminOrder;
