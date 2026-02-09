import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { userFields } from "../../../component/UX/Admin/userConfig/userFields";
import "../UI/User.scss";
import useUsers from "../../../CustomHooks/useUser";
import { CardContext } from "../../../component/Context/CardContext";
import axios from "axios";
import { BASE_URL } from "../../../Api/ApiCore";
import { endPoints } from "../../../Api/Urls";
import EditModal from "../../../component/Modals/EditModal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleCheck,
  faBoxOpen,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AddData from "../../../component/Modals/AddData/AddData";
import Table from "../../../component/UX/Table";
import InfoCard from "../../../component/UX/Admin/InfoCard";
import useUserStats from "../../../component/UX/Admin/hooks/useUserStats";
import columns from "../../../component/UX/Admin/userConfig/userColumns";
import { role,status } from "../../../component/UX/Admin/userConfig/userColumnHelper";

const Users = () => {
  const { users, setUsers,handleStatus,handleRole,handleDelete,handleEdit,selectedUser,setShowEditModal,showEditModal  } = useUsers();
  const stats = useUserStats(users);//passing arguments to function and storing all returning objects into one stats object

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All Role");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const { orders } = useContext(CardContext);

  const userOrders = orders.map((order) => {
    return users.filter((user) => user.id === order.userId);
  });
  const [currentPage, setCurrentPage] = useState(1); // Start at page 1
  const [itemsPerPage, setItemsPerPage] = useState(5); // Show 5 items per page 
  const [searchFilter, setSearchFilter] = useState("");

  const usersWithOrders = useMemo(() => {
    return users.map((user) => ({
      ...user,
      orders: orders.filter((order) => order.userId === user.id),
    }));
  }, [users, orders]);

  const filteredUser = usersWithOrders.filter((userOrder) => {
    if (
      selectedRole != "All Role" &&
      selectedRole.toLowerCase() !== userOrder.role?.toLowerCase()
    )
      return false;
    if (
      selectedStatus != "All Status" &&
      selectedStatus.toLowerCase() !== userOrder.status?.toLowerCase()
    )
      return false;
    if (searchFilter) {
      const search = searchFilter.toLowerCase();

      const isMatch =
        userOrder.firstName?.toLowerCase().includes(search) ||
        userOrder.email?.toLowerCase().includes(search) ||
        userOrder.status?.toLowerCase().includes(search) ||
        userOrder.role?.toLowerCase().includes(search);

      if (!isMatch) return false;
    }

    return true;
  });

  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
    setCurrentPage(1);
    // setItemsPerPage(40);
  };

  //pagination
  const data = filteredUser;
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

  const handleEditSuccess = (updateUser) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id == updateUser.id ? { ...user, ...updateUser } : user,
      ),
    );
  };

  const handleRoleClick = (chosenRole) => {
    setSelectedRole(chosenRole);
  };
  const handleStatusClick = (chosenStatus) => {
    setSelectedStatus(chosenStatus);
  };

  const [showDropdown, setShowDropdown] = useState();

  const handleDropdown = (type) => {
    setShowDropdown((prev) => (prev === type ? null : type));
  };

  const statusRef = useRef();
  const roleRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown === "status" && statusRef.current) {
        if (!statusRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }

      if (showDropdown === "role" && roleRef.current) {
        if (!roleRef.current.contains(e.target)) {
          setShowDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="admin-user">
      {showAddModal && (
        <AddData
          setShowAddModal={setShowAddModal}
          fields={userFields}
          title="Add User"
          defaultValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "user",
            status: "Active",
          }}
          apiConfig={{
            url: BASE_URL + endPoints.users,
          }}
          onSuccess={(newProduct) => {
            setUsers((prev) => [...prev, newProduct]);
          }}
        />
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          fields={userFields}
          defaultValues={selectedUser}
          onSuccess={handleEditSuccess}
          apiConfig={{
            url: BASE_URL + endPoints.users,
            idKey: "id",
            payload: (data) => ({
              id: selectedUser.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              role: data.role,
              status: data.status,
            }),
          }}
        />
      )}
      <div className="user-content">
        <div className="head">
          <h3>User Management</h3>
          <p>Manage System users and their permissions</p>
        </div>
        <div className="user-info">
          <InfoCard
            color="rgb(10, 71, 136)"
            bgc="#D7E7FF"
            title="Total Users"
            icon={<FontAwesomeIcon icon={faUser} />}
            desc={`${userOrders.length} with Orders`}
            dataNo={stats.onlyUser.length}
          />
          <InfoCard
            color="#39977f"
            bgc="#D5FCE1"
            title="Active Users"
            icon={<FontAwesomeIcon icon={faCircleCheck} />}
            desc={`${Math.ceil((stats.userActive.length / stats.onlyUser.length) * 100)}% of total`}
            dataNo={stats.userActive.length}
          />
          <InfoCard
            bgc="#F3E5FF"
            color="#6f4098"
            title="Admins"
            icon={<FontAwesomeIcon icon={faUser} />}
            desc="Administrative users"
            dataNo={stats.onlyAdmin.length}
          />
          <InfoCard
            bgc="#FFEACF"
            color="#da8f2c"
            title="Total Order"
            icon={<FontAwesomeIcon icon={faBoxOpen} />}
            desc="Across all users"
            dataNo={orders.length}
          />
        </div>

        <div className="table-wrapper">
          <div className="table-upper">
            <div className="filter">
              <input
                placeholder="Search users by name, email, phone, or ID..."
                type="text"
                onChange={(e) => handleSearch(e)}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>

            <div className="upper-right">
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

              <div
                className="filter-options"
                ref={roleRef}
                onClick={() => handleDropdown("role")}
              >
                <h3>{selectedRole}</h3>
                <ul
                  className={`${showDropdown === "role" ? "show-option" : ""}`}
                >
                  <li onClick={() => handleRoleClick("All Role")}>All Role</li>
                  {role.map((r) => (
                    <li key={r} onClick={() => handleRoleClick(r)}>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="add-new" onClick={() => setShowAddModal(true)}>
                <button className="new-user">+ New User</button>
              </div>
            </div>
          </div>
          <div className="table-container">
            <Table columns={columns(handleStatus,handleRole,handleDelete,handleEdit)} data={paginatedData} />
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

export default Users;
