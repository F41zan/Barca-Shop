import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../UI/UserAuth.scss";
import logo from "../../../assets/img/logo.png";
import InputField from "../../../component/UX/InputField";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../Api/ApiCore";
import { endPoints } from "../../../Api/Urls";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    password: false,
    email: false,
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    const res = await axios.get(BASE_URL+endPoints.users);
    const user = res.data.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "user") {
      //   toast.success("Login Successfully!", {
      //   autoClose: 1200,
      //   style: { marginTop: "40px" },
      // });
        navigate("/Landing", { state: { fromLogin: true } });
      } else {
        navigate("/admin");
      }
    } else {
      setError((prev) => ({
        ...prev,
        email: true,
        password: true,
      }));
      // alert("Invalid Email or Password");
      toast.error("Invalid Email or Password", {
        autoClose: 1500,
        style: { marginTop: "50px" },
      });
    }
  };
  return (
    <main className="user-auth">
      <div className="container">
        <div className="header">
          <img src={logo} alt="" />
          <p>Enter your login information</p>
        </div>
        <form action="" onSubmit={handleSubmit(handleLogin)}>
          <div className="field-wrapper">
            <InputField
              label="Email"
              name="email"
              type="email"
              msg="Email is required"
              register={register}
              errors={errors}
            />
            <InputField
              label="Password"
              name="password"
              type="text"
              register={register}
              msg="Password is required"
              errors={errors}
            />
            <button type="submit" className="sign-in">
              Sign In
            </button>
          </div>
          <h4 className="directedTo" onClick={() => navigate("/register")}>
            CREATE AN ACCOUNT
          </h4>
        </form>
      </div>
    </main>
  );
};

export default Login;
