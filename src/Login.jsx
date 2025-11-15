import axios from "axios"
import { useFormik } from "formik"
import { Link } from "react-router"

function Login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            let error = {}
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!values.email || !emailRegex.test(values.email)) {
                error.email = "Please enter a valid email"
            }
            if (!values.password || values.password.length < 6) {
                error.password = "Please enter a valid password"
            }
            return error
        },
        onSubmit: async (values) => {
            try {
                await axios.post("https://reset-flow-server.onrender.com/user/login", values)
                formik.resetForm()
                alert("Login success")
            } catch (error) {
                alert(error.response.data.message)
            }
        },
        validateOnChange: false

    })
    return (
        <div className=" bg-[#5A55E3] min-h-screen max-w-[1920px] mx-auto ">
            <div className="py-30 grid grid-cols-3">
                <div className="col-span-1">
                    <p className="font-bold text-5xl text-center text-white mt-30">Welcome !</p>
                </div>
                <div className="col-span-2 grid grid-cols-2 border-1 mx-10 rounded-xl bg-[#E5E5E5]">
                    <div className="mx-[50px] py-40">
                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/illustration.png" alt="Home" className="h-100 w-120 " />
                    </div>
                    <div className=" m-10 ">
                        <div className="bg-white my-auto h-full rounded-lg p-5 ">
                            <p className="mt-20">Welcome to</p>
                            <p className="font-bold text-3xl text-[#5A55E3]"> Password Reset App</p>
                            <div className="mt-15">
                                <form action="" onSubmit={formik.handleSubmit}>

                                    <div className="flex border-1 p-1 rounded">
                                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/email.png" alt="" className="p-2" />
                                        <input type="text" className="w-full p-1 border-none focus:outline-none focus:ring-0" placeholder="Enter your email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                                    </div>
                                    <span className="text-[#FF0000]">{formik.errors.email}</span>
                                    <div className="flex border-1 mt-5 p-1 rounded">
                                        <img src="https://raw.githubusercontent.com/jozva/reset-flow-client/refs/heads/main/src/assets/password.png" alt="" className="p-2" />
                                        <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" className="w-full p-1 border-none focus:outline-none focus:ring-0" placeholder="Enter your password" />
                                    </div>
                                    <span className="text-[#FF0000]">{formik.errors.password}</span>
                                    <p className="my-5 text-right text-indigo-500 cursor-pointer"> <Link to={"/forget"}>Forgot Password</Link></p>
                                    <input className="cursor-pointer border-1 p-2 px-15 rounded-[5px] block mx-auto" type="submit" />
                                    <p className="text-center mt-10">Don’t have an account? <span className="text-[#5A55E3] cursor-pointer"><Link to={"/register"}>Register</Link></span></p>


                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default Login