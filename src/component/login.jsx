import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "./api/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {jwtDecode} from 'jwt-decode';
import { Eye, EyeOff } from 'react-feather';

const Login = () => {
  const [usernameOrEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await postData('/auth/login', {usernameOrEmail, password})
      const token = response.data.token;
      const decodeToken = jwtDecode(token);
      Cookies.set('token', token)
      Cookies.set ('email', response.data.email)
      Cookies.set ('username', response.data.username)
      Cookies.set ('role', response.data.role)
      const expirationTime = decodeToken.exp * 1000;
      Cookies.set('token_expiration', expirationTime)
      toast.success("Login Successfully");
      navigate('/dashboard');
    }catch(error){
      console.log("error>>>", error)
      toast.error("Login failed :" + (error.message || "Invalid credentials"))
    }
   };
   const passwordvisibility = () =>{
    setShowPassword((prev) => !prev)
   }

  return (
    <div className="row w-100 m-0">
      <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
        <div className="card col-lg-4 mx-auto">
          <div className="card-body px-5 py-5">
            <h3 className="card-title text-left mb-3">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username or email *</label>
                <input type="text" value={usernameOrEmail} onChange={(e)=> setEmail(e.target.value)} className="form-control p_input" required />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control p_input" required/>
                <div className="text-center mt-2">
                  <button type="button" 
                  onClick={passwordvisibility}
                  className="btn btn-outline-secondary"
                  style={{ border:'none'}}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />{" "}
                    Remember me <i className="input-helper" />
                  </label>
                </div>
                <a href="#" className="forgot-pass">
                  Forgot password
                </a>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block enter-btn"
                >
                  Login
                </button>
              </div>
              <div className="d-flex">
                <button className="btn btn-facebook mr-2 col">
                  <i className="mdi mdi-facebook"></i> Facebook{" "}
                </button>
                <button className="btn btn-google col">
                  <i className="mdi mdi-google-plus"></i> Google plus{" "}
                </button>
              </div>
              <p className="sign-up">
                Don't have an Account?<a href="#"> Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;