import ColumnActionBtn from "../../../UX/Admin/ColumnActionBtn";
import { status } from "./OrderHelper";
const OrderColumn = (handleEdit, handleDelete, handleStatus) => [
  {
    label: "ORDER ID",
    key: "orderId",
  },
  {
    label: "CUSTOMER",
    key: "userName",
  },
  {
    label: "Amount",
    render: (order) => order.pricing.totalAmount,
  },
  {
    label: "Status",
    key: "orderStatus",
    render: (order) => (
      <select
        value={order.orderStatus}
        onChange={(e) => handleStatus(order.orderId, e.target.value)}
      >
        {status.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    ),
  },
  {
    label: "Date",
    key: "orderDate",
  },

  {
    label: "Actions",
    render: (order) => (
      <ColumnActionBtn
        handleDelete={() => handleDelete(order.orderId)}
        handleEdit={() => handleEdit(order)}
      />
    ),
  },
];

export default OrderColumn;
