import { useMemo } from "react";

const useUserStats = (users = []) => {

  const stats = useMemo(() => {
    const onlyUser = users.filter(u => u.role === "user");
    const onlyAdmin = users.filter(u => u.role === "admin");

    const userActive = users.filter(
      u =>
        u.role?.toLowerCase() === "user" &&
        u.status?.toLowerCase() === "active"
    );

    return { onlyAdmin, onlyUser, userActive };
  }, [users]);

  return stats;
};

export default useUserStats