import {
  Avatar,
  RoleSelect,
  StatusSelect,
  role,
  status,
} from "./userColumnHelper";

import ActionsBtns from "../ColumnActionBtn";
const columns = (handleStatus,handleRole,handleDelete,handleEdit) => [
  {
    label: "User",
    key: "firstName",
    render: (user) => (
      <Avatar
        userImg={user?.img}
        userFirstName={user?.firstName}
        userEmail={user?.email}
      />
    ),
  },
  {
    label: "Contact",
    key: "email",
  },
  {
    label: "Role",
    render: (user) => (
      <RoleSelect
        value={user?.role}
        roles={role}
        onChangeHandler={(e) => handleRole(user?.id, e.target.value)}
      />
    ),
  },
  {
    label: "Status",
    render: (user) => (
      <StatusSelect
        stats={status}
        value={user?.status}
        onChangeHandler={(e) => handleStatus(user?.id, e.target.value)}
      />
    ),
  },
  {
    label: "Join Date",
    key: "createdAt",
  },
  {
    label: "Activity",
    render: (user) => user.orders?.length,
  },
  {
    label: "Actions",
    render: (user) => (
      <ActionsBtns
        handleEdit={() => handleEdit(user)}
        handleDelete={() => handleDelete(user.id)}
      />
    ),
  },
];

export default columns;
