import { useContext } from "react";
import "../UI/AdminDashboard.scss";
import { CardContext } from "../../../component/Context/CardContext";
import useProducts from "../../../CustomHooks/useProducts";
import useUsers from "../../../CustomHooks/useUser";
import InfoCard from "../../../component/UX/Admin/InfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faIndianRupeeSign,
  faFolderOpen,
  faCube,
  faArrowTrendUp,
  faArrowTrendDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import RevenueTrendChart from "../../../component/UX/Admin/Charts/RevenueTrendChart";
import SalesByCategory from "../../../component/UX/Admin/Charts/SalesByCategory";
import MonthlySalesPerformance from "../../../component/UX/Admin/Charts/MonthlySalesPerformance";
import OrderVsRevenue from "../../../component/UX/Admin/Charts/OrderVsRevenue";
import useAdminStatsData from "../../../component/UX/Admin/hooks/useAdminStatsData";
const AdminDashboard = () => {
  const { orders } = useContext(CardContext);
  const { TotalOrderPrice, pendingOrder,deliverOrder, onlyUser,
    activeUser, lowStock, outOfStock, stockCount, } = useAdminStatsData();
  const { products } = useProducts();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="head">
            <h3>FC BARCELONA STORE</h3>
            <p>Dashboard Overview & Analytics</p>
          </div>
          <div className="dash-right">
            <button className="head-btn">
              <i className="ri-calendar-view"></i> This Month
            </button>
          </div>
        </div>

        <div className="dashboard-info">
          <InfoCard
            title="Total Revenue"
            bgc="#ecf4fe"
            icon={<FontAwesomeIcon icon={faIndianRupeeSign} />}
            color="#5278D0"
            desc="+229% conversion"
            dataNo={TotalOrderPrice.toLocaleString("en-IN")}
          />
          <InfoCard
            title="Total Order"
            bgc="#FDF1F1"
            icon={<FontAwesomeIcon icon={faFolderOpen} />}
            color="#CA232D"
            desc={`${deliverOrder.length} delivered`}
            dataNo={orders.length}
          />
          <InfoCard
            title="Pending Order"
            bgc="#fefbe5"
            icon={<FontAwesomeIcon icon={faCube} />}
            color="#DEAE46"
            desc={
              <>
                <i className="ri-error-warning-line"></i> Needs attention
              </>
            }
            dataNo={pendingOrder.length}
          />
          <InfoCard
            title="All User"
            bgc="#fbe6ff"
            icon={<FontAwesomeIcon icon={faUser} />}
            desc={
              <>
                <FontAwesomeIcon icon={faArrowTrendUp} /> {activeUser.length}{" "}
                Active
              </>
            }
            color="#403647"
            dataNo={onlyUser.length}
          />
          <InfoCard
            title="Total Products"
            bgc="transparent"
            icon={<FontAwesomeIcon icon={faCube} />}
            color="#b382da"
            dataNo={products.length}
            flexEnd
          />
          <InfoCard
            title="In Stock"
            bgc="transparent"
            icon={<FontAwesomeIcon icon={faArrowTrendUp} />}
            color="#408f7a"
            dataNo={stockCount}
            flexEnd
          />
          <InfoCard
            title="Low Stock"
            bgc="transparent"
            icon={<FontAwesomeIcon icon={faArrowTrendDown} />}
            color="#d69224"
            dataNo={lowStock}
            flexEnd
          />
          <InfoCard
            title="Out Of Stock"
            bgc="transparent"
            icon={<i className="ri-error-warning-line"></i>}
            color="#d83838"
            dataNo={outOfStock.length}
            flexEnd
          />
        </div>

        <div className="charts">
          <RevenueTrendChart />
          <SalesByCategory />
          <MonthlySalesPerformance />
          <OrderVsRevenue />
        </div>

        <div className="recent-orders">
          <div className="order-card">
            <div className="recent-head">
              <h3 className="head">Recent Orders</h3>
              <NavLink to="/admin/orders" className="nav-link">
                <h3 className="view">
                  View All <i className="ri-arrow-right-long-line"></i>
                </h3>
              </NavLink>
            </div>
            {orders
              .slice(-3)
              .reverse()
              .map((order, index) => (
                <div className="order">
                  <div className="icon-orderId">
                    <div className="icon-wrapper">
                      <FontAwesomeIcon icon={faFolderOpen} />
                    </div>
                    <div className="order-id">
                      <h3>{order.orderId}</h3>
                      <div className="user-item">
                        <span>{order.items.length} Items </span>{" "}
                        <div className="name">
                          <div className="dot"></div>
                          <h4>{order.userName}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-status">
                    <h3 className="price">₹{order.pricing.totalAmount}</h3>
                    <p className="status">
                      {order.orderStatus[0].toUpperCase()}
                      {order.orderStatus.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
