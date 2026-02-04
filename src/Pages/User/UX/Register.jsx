import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../../component/UX/InputField";
import logo from "../../../assets/img/logo.png";
import "../UI/UserAuth.scss";
import { BASE_URL } from "../../../Api/ApiCore";
import { endPoints } from "../../../Api/Urls";

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data) => {
   const res=  await axios.post(BASE_URL + endPoints.users, {
      email: data.email,
      password: data.password,
      role: "user",
      phone: data.phone,
      createdAt: new Date().toLocaleDateString(),
      firstName: data.firstName,
      lastName: data.lastName,
      status: "Active",
    });
     localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/Landing");
  };

  const registerFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      msg: "First Name is required",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      msg: "Last Name is required",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      msg: "Email is required",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      msg: "Password is required",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      msg: "Phone No is required",
    },
  ];

  return (
    <main className="user-auth">
      <div className="container">
        <div className="header">
          <img src={logo} alt="" />
        </div>
        <form action="" onSubmit={handleSubmit(handleRegister)}>
          <div className="field-wrapper">
            {registerFields.map((fields)=>(
            <InputField
              register={register}
              errors={errors}
              name={fields.name}
              type={fields.type}
              msg={fields.msg}
              label={fields.label}
            />
            ))}
            <button className="sign-in">Create Account</button>
          </div>
          <h4 className="directedTo" onClick={() => navigate("/Login")}>
            ALREADY HAVE AN ACCOUNT? SIGN IN
          </h4>
        </form>
      </div>
    </main>
  );
};

export default Register;
