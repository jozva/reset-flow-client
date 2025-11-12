

import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Forgot() {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validate: (values) => {
      let error = {};
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.email || !emailRegex.test(values.email)) {
        error.email = "Please enter a valid Email";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        if (!showOtpBox) {
          const response = await axios.post("https://reset-flow-cmgs.onrender.com/user/forget", {
            email: values.email,
          });
          alert("OTP sent successfully to your email!");
          if (response.data.code === 200) {
            setShowOtpBox(true);
          }
        }
        else {
          const response = await axios.post("https://reset-flow-cmgs.onrender.com/user/forget", {
            email: values.email,
            otp: values.otp,
          });
          if (response.data.code === 200) {
            alert("OTP verified successfully!");
            navigate("/reset");
          }
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="bg-[#5A55E3] grid min-h-screen">
      <div className="w-5xl mx-auto my-auto bg-white rounded-xl border-1">
        <p className="font-bold text-4xl p-5 text-[#5A55E3]">Password Reset Flow</p>
        <p className="font-bold text-4xl p-5 text-center text-[#5A55E3] mt-15">
          Reset your password
        </p>
        <p className="w-3xl mx-auto mt-15">
          To reset your password, enter your email below and submit. An email will be sent to you
          with instructions about how to complete the process.
        </p>

        <form onSubmit={formik.handleSubmit}>
          {!showOtpBox && (
            <div>
              <input
                type="text"
                className="border-1 focus:outline-none focus:ring-0 w-md p-2 mx-auto block mt-15 relative"
                placeholder="Enter your email here"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <p className="text-[#FF0000] max-w-3xl mx-auto absolute left-[37%] mt-2">
                {formik.errors.email}
              </p>
            </div>
          )}

          {showOtpBox && (
            <div className="mb-4 px-4 py-2 rounded">
              <input
                type="text"
                className="border-1 focus:outline-none focus:ring-0 w-md p-2 mx-auto block mt-15 relative"
                placeholder="Enter OTP here"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
              />
            </div>
          )}

          <input
            type="submit"
            className="w-40 text-[#5A55E3] mx-auto block mt-15 cursor-pointer border-1 border-black rounded-lg p-2"
          />
        </form>

        <div className="flex w-3xl mx-auto mb-10 place-content-between">
          <p className="text-center mt-10">
            Already have an account?{" "}
            <span className="text-[#5A55E3] cursor-pointer">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
          <p className="text-center mt-10">
            Don’t have an account?{" "}
            <span className="text-[#5A55E3] cursor-pointer">
              <Link to={"/register"}>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forgot;



// xxbd lgyq nnwf dkoa