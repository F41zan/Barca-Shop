export const userFields = [
      { name: "firstName", label: "First Name", type: "text", msg: "Required" },
      { name: "lastName", label: "Last Name", type: "text", msg: "Required" },
      { name: "email", label: "Email", type: "email", msg: "Required" },
      { name: "phone", label: "Phone", type: "text", msg: "Required" },
      {
        name: "role",
        label: "Role",
        type: "select",
        options: ["admin", "user"],
        msg: "Required",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Inactive", "Pending", "Suspended"],
        msg: "Required",
      },
    ];