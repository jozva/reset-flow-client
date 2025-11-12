import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Link } from "react-router-dom"

function ResetPassword() {
  const [showAuth, setShowAuth]=useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      cnfPassword: ""
    },
    validate: (values) => {
      const error = {}
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!values.email || !emailRegex.test(values.email)) {
        error.email = "Please enter a valid email address"
      }
      if (!values.newPassword) {
        error.newPassword = "Please enter your new password"
      } else if (values.newPassword.length < 6) {
        error.newPassword = "Password must be at least 6 characters"
      }
      if (!values.cnfPassword) {
        error.cnfPassword = "Please confirm your password"
      } else if (values.newPassword !== values.cnfPassword) {
        error.cnfPassword = "Passwords do not match"
      }

      return error
    },
    onSubmit: async (values) => {
      try {
        await axios.post("https://reset-flow-cmgs.onrender.com/user/reset", values)
        alert("Password reset successfully!")
        formik.resetForm()
      } catch (error) {
        alert(error.response?.data?.message || "Password reset failed")
        formik.resetForm()
        setShowAuth(true)
      }
    },
    validateOnChange: false,
    validateOnBlur: true
  })

  return (
    <div className="bg-[#5A55E3] min-h-screen flex justify-center items-center">
      <div className="bg-[#E5E5E5] rounded-2xl shadow-lg grid grid-cols-2 w-[80%] max-w-5xl overflow-hidden">
        
        {/* Left Side */}
        <div className="flex justify-center items-center p-10 bg-white">
          <img
            src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/illustration.png"
            alt="Reset Illustration"
            className="w-[350px]"
          />
        </div>

        {/* Right Side */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#5A55E3] mb-6">
            Reset Your Password
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <div className="flex items-center border rounded-lg p-2 bg-white">
                <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/email.png" alt="" className="h-6 w-6 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter your registered email"
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <div className="flex items-center border rounded-lg p-2 bg-white">
                <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/lock.png" alt="" className="h-6 w-6 mr-2" />
                <input
                  type="password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  placeholder="Enter your new password"
                  className="w-full outline-none text-gray-700"
                  autoComplete="new-password"
                />
              </div>
              {formik.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center border rounded-lg p-2 bg-white">
                <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/password.png" alt="" className="h-6 w-6 mr-2" />
                <input
                  type="password"
                  name="cnfPassword"
                  value={formik.values.cnfPassword}
                  onChange={formik.handleChange}
                  placeholder="Re-enter your new password"
                  className="w-full outline-none text-gray-700"
                  autoComplete="new-password"
                />
              </div>
              {formik.errors.cnfPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.cnfPassword}</p>
              )}
            </div>
            

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#5A55E3] text-white py-2 rounded-lg hover:bg-[#4741d5] transition-all"
            >
              Reset Password
            </button>

            <p className="text-center text-gray-700">
              Remembered your password?{" "}
              <Link to="/login" className="text-[#5A55E3] font-semibold hover:underline">
                Login
              </Link>
            </p>

            {showAuth &&(<p className="text-center text-gray-700">
              Click to {" "}
              <Link to="/forgot" className="text-[#5A55E3] font-semibold hover:underline">
                Authorization
              </Link>
            </p>)}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
