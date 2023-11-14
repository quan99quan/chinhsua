import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../store/slices/user.slice";
import { Modal } from "antd";
export default function User() {
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);

  const handleAddUser = () => {
    Modal.confirm({
      title: "Are you sure add this item?",
      okText: "Yes",
      onOk: () => {
        const newName = window.prompt("New Name");
        const newEmail = window.prompt("New Email");
        if (!newName || !newEmail) {
          alert("Please enter both Name and Email.");
          return;
        }
        const validate = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        };
        if (!validate(newEmail)) {
          alert("Email không đúng định dạng");
          return;
        }
        const newUser = {
          name: newName,
          email: newEmail,
        };
        axios
          .post("http://localhost:3000/users", newUser)
          .then((res) => {
           
            if (res.status === 201) {
              dispatch(userAction.addToList(res.data));
            } else {
              // Xử lý lỗi
            }
          })
          .catch((err) => {
            console.error("Lỗi thêm người dùng:", err);
            // Xử lý lỗi
          });
      },
    });
  };

  const handleDeleteUser = (user) => {
    axios
      .delete(`http://localhost:3000/users/${user.id}`)
      .then((res) => {
        const check = confirm(`Are you sure delete ${user.name}?`);
        if (check) {
          if (res.status === 200) {
            dispatch(userAction.deleteList(user.id));
          } else {
            // Xử lý lỗi
          }
        }
      })
      .catch((err) => {
        // Xử lý lỗi
      });
  };
  const handleEdit = (user) => {
    Modal.confirm({
      title: "Are you sure edit this item?",

      okText: "Yes",
      onOk: () => {
        axios
          .patch(`http://localhost:3000/users/${user.id}`, {
            name: window.prompt("New Name", user.name),
            email: window.prompt("New Email", user.email),
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(
                userAction.editList({
                  id: user.id,
                  name: res.data.name,
                  email: res.data.email,
                })
              );
            } else {
              // Xử lý lỗi
            }
          })
          .catch((err) => {
            // Xử lý lỗi
          });
      },
    });
  };

  useEffect(() => {
    // Logic cập nhật giao diện người dùng tại đây
  }, [userStore.list]);

  return (
    <div>
      <h2>User Page</h2>
      <button onClick={handleAddUser}>Add</button>
      <ul>
        {userStore.list?.map((user, index) => (
          <li key={user.id}>
            Name: {user.name} - Email: {user.email}
            <button onClick={() => handleDeleteUser(user)}>Delete</button>
            <button onClick={() => handleEdit(user)}>edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
