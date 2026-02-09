import { useEffect, useState } from "react";
import { BASE_URL } from "../Api/ApiCore";
import { endPoints } from "../Api/Urls";
import axios from "axios";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser,setSelectedUser] = useState();
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => { 
      try {
        const res = await axios.get(BASE_URL + endPoints.users);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

   const handleRole = async (userId, role) => {
    try {
      await axios.patch(`${BASE_URL + endPoints.users}/${userId}`, {
        role: role,
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, role } : user)),
      );
    } catch (err) {
      console.error(err);
    }
  };

 const handleStatus = async (userId, status) => {
    try {
      await axios.patch(`${BASE_URL + endPoints.users}/${userId}`, {
        status,
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status } : user)),
      );
    } catch (err) {
      console.error(err);
    }
  };
  
  //Editing:
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    await axios.delete(`${BASE_URL + endPoints.users}/${userId}`);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };


  return { users, setUsers,handleStatus,handleRole,handleDelete,handleEdit,selectedUser,setShowEditModal,showEditModal };
};

export default useUsers;
