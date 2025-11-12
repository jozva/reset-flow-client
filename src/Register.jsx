import axios from "axios"
import { useFormik } from "formik"
import { Link } from "react-router"

function Register() {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cnfPassword: ""
        },
        validate: (values) => {
            let error = {}
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            let usernameRegex = /^[a-zA-Z0-9_.]{3,15}$/
            if (!values.username || !usernameRegex.test(values.username)) {
                error.username = "Please enter a valid user name"
            }
            if (!values.email || !emailRegex.test(values.email)) {
                error.email = "Please enter a valid Email"
            }
            if (!values.password) {
                error.password = "Please enter a valid Password"
            }
            if (values.password.length < 6) {
                error.password = "Please enter a valid Password"
            }
            if (!values.cnfPassword) {
                error.cnfPassword = "Please enter a valid Password"
            }
            if (values.password !== values.cnfPassword) {
                error.cnfPassword = "Please enter same password"
            }
            return error
        },
        onSubmit: async (values) => {
            try {
                await axios.post("https://reset-flow-cmgs.onrender.com/user/register" , values)
                formik.resetForm()
                
            } catch (error) {
                alert(error.response.data.message)
            }
        },
        validateOnChange: false,
        validateOnBlur : true
    })
    return (
        <div className=" bg-[#5A55E3] min-h-screen max-w-[1920px] mx-auto ">
            <div className="py-30 grid grid-cols-3">
                <div className="col-span-2 grid grid-cols-2 border-1 mx-10 rounded-xl bg-[#E5E5E5]">
                    <div className="mx-[50px] py-40">
                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/illustration.png" alt="Home" className="h-100 w-120 " />
                    </div>
                    <div className=" m-10 ">
                        <div className="bg-white my-auto  rounded-lg p-5 ">
                            <p className="">Welcome to</p>
                            <p className="font-bold text-3xl text-[#5A55E3]"> Password Reset App</p>
                            <div className="mt-15">
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <div className="flex border-1 p-1 rounded">
                                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/user.png" alt="" className="p-2 h-[43px] w-[43px]" />
                                        <input type="text"
                                            name="username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            className="w-full p-1 border-none focus:outline-none focus:ring-0"
                                            placeholder="Enter your username" />
                                    </div>
                                    <p className="text-[#FF0000]">{formik.errors.username}</p>
                                    <div className="flex border-1 mt-5 p-1 rounded">
                                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/email.png" alt="" className="p-2 h-[43px] w-[50px]" />
                                        <input type="text"
                                            className="w-full p-1 border-none focus:outline-none focus:ring-0"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange} />
                                    </div>
                                    <span className="text-[#FF0000]">{formik.errors.email}</span>
                                    <div className="flex border-1 mt-5 p-1 rounded">
                                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/lock.png" alt="" className="p-2 h-[43px] w-[43px]" />
                                        <input type="text"
                                            className="w-full p-1 border-none focus:outline-none focus:ring-0"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            autoComplete="current-password" />
                                    </div>
                                    <span className="text-[#FF0000]">{formik.errors.password}</span>

                                    <div className="flex border-1 mt-5 p-1 rounded">
                                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/password.png" alt="" className="p-2 h-[43px] w-[43px]" />
                                        <input type="password"
                                            className="w-full p-1 border-none focus:outline-none focus:ring-0"
                                            placeholder="Re-enter your password"
                                            name="cnfPassword"
                                            value={formik.values.cnfPassword}
                                            onChange={formik.handleChange}
                                            autoComplete="current-password"  />
                                    </div>
                                    <span className="text-[#FF0000]">{formik.errors.cnfPassword}</span>
                                    <input className="cursor-pointer border-1 p-2 px-15 rounded-[5px] block mx-auto mt-10" type="submit" />
                                    <p className="text-center mt-10">Already have an account? <span className="text-[#5A55E3] cursor-pointer"><Link to={"/login"}>Login</Link></span></p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-span-1">
                    <p className="font-bold text-5xl text-center text-white mt-30">
                        Register Here !
                    </p>
                </div>


            </div>
        </div>
    )
}
export default Register