import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { replace, useNavigate } from "react-router-dom";
import DollarLogo from "../assets/InstaPayIcon.svg";
import axios from "axios"; // Import Axios
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../store";
const LoginForm = ({ setMoveImage, setSignUpButton, setLoginMove, loginMove, enteredValues, setEnteredValues, edited, setEdited }) => {
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    const userServiceUrl = import.meta.env.VITE_USER_SERVICE_URL;
    console.log(userServiceUrl); // Should print the URL, e.g., http://localhost:3001
    
    // Updated Email Regex for validation: Must include @ and .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;
    const emailIsInvalid = edited.email && !emailRegex.test(enteredValues.email);

    // Password must not be empty
    const passwordIsInvalid = edited.password && enteredValues.password.trim() === "";

    async function handleSubmit(event) {
        event.preventDefault();
        const userServiceUrl = import.meta.env.VITE_USER_SERVICE_URL; 
        console.log(userServiceUrl);
        

        const { email, password } = enteredValues;

        if (emailIsInvalid || passwordIsInvalid) {
            setLoginError("Please fix the errors before submitting.");
            return;
        }

        try {
            // Make the API call to login
            const response = await axios.post(`${userServiceUrl}/api/auth/login`,{
                email,
                password,
            });

        
                setLoginError(""); 
                const token =response.data.data.token;
                console.log(response.data.data.username);
                console.log(response.data.data);
                
                console.log(response.data.data.email);
                console.log(response.data.data.token);
                localStorage.setItem('username', response.data.data.username);
                localStorage.setItem("email",response.data.data.email);   
                localStorage.setItem("id",response.data.data.userId); 
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("id",response.data.data.userId);       
                console.log(response.data.data);
                
                setEnteredValues({
                    ...enteredValues,
                    name: response.data.username,
                    email: response.data.email,
                    // isAdmin: response.data.user.isAdmin,
                });

                console.log("Login successful!");
                toast.success("Login successful!", {
                    position: "top-right"
                });


           console.log(response.data.data.token);
  


                // console.log(response.data.user.isAdmin);

                // Check if the user is an admin and navigate accordingly
                // if (response.data.user.isAdmin) {
                //     navigate("/admin", { replace: true });
                // } else {
                //     navigate("/home", { replace: true });
                // }
                navigate("/home", { replace: true });
            
        } catch (error) {
            setLoginError("Invalid email or password. Please try again.");
            console.error("Login error:", error);
        }
    }

    function handleInputChange(identifier, value) {
        setLoginError("");
        setEdited((prevEdited) => ({
            ...prevEdited,
            [identifier]: false,
        }));
        setEnteredValues((prevEnteredValues) => ({
            ...prevEnteredValues,
            [identifier]: value,
        }));
    }

    function handleBlurChange(identifier) {
        setEdited((prevEdited) => ({
            ...prevEdited,
            [identifier]: true,
        }));
    }

    return (
        <motion.div
            initial={{ x: 644 }}
            animate={{ x: loginMove }}
            className="w-full sm:w-1/2 p-6 sm:p-12 flex flex-col justify-center bg-white"
        >

            <div className="text-center mb-16">
                <img src={DollarLogo} alt="Robot Photo" className="w-[100px] mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-welcome-text-h2 mb-4">
                    Nice to see you again
                </h2>
                <h1 className="text-3xl sm:text-7xl font-bold text-welcome-text-h1">
                    Welcome Back
                </h1>
            </div>

            {/* Suspended Alert */}
           
            <form className="space-y-6 mt-6 min-h-[200px]" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="space-y-2 mb-8">
                        <label
                            className={`block text-sm font-bold ${emailIsInvalid ? "text-red-500" : "text-purple-800"}`}
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className={`w-full p-3 text-sm border rounded-md ${emailIsInvalid ? "border-red-400 " : "border-gray-300"}`}
                                onChange={(event) => handleInputChange("email", event.target.value)}
                                type="email"
                                placeholder="Enter your Email"
                                required
                                onBlur={() => handleBlurChange("email")}
                            />
                            <p
                                className={`absolute top-full mt-1 text-sm text-red-500 transition-opacity duration-200 ${emailIsInvalid ? "opacity-100" : "opacity-0"}`}
                            >
                                Email must include "@" and end with ".com"
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label
                            className={`block text-sm font-bold ${passwordIsInvalid ? "text-red-500" : "text-purple-800"}`}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className={`w-full p-3 text-sm border rounded-md ${passwordIsInvalid ? "border-red-400 " : "border-gray-300"}`}
                                onChange={(event) => handleInputChange("password", event.target.value)}
                                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                                placeholder="Enter your Password"
                                required
                                onBlur={() => handleBlurChange("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? (
                                    <AiOutlineEye size={20} /> // Eye icon when password is hidden

                                ) : (
                                    <AiOutlineEyeInvisible size={20} /> // Eye icon when password is visible
                                )}
                            </button>
                            <p
                                className={`absolute top-full mt-1 text-sm text-red-500 transition-opacity duration-200 ${passwordIsInvalid ? "opacity-100" : "opacity-0"}`}
                            >
                                Password cannot be empty
                            </p>
                        </div>
                    </div>
                </div>

                {loginError && (
                    <p className="text-red-500 text-sm text-center">{loginError}</p>
                )}
                <button
                    className="w-full sm:w-[392px] bg-social-button text-white p-3 rounded-md hover:bg-purple-700 transition mx-0 sm:ml-16"

                >
                    Login
                </button>
            </form>
            <div className="flex items-center mb-6 mt-5 w-full sm:w-[333px] mx-auto text-xs text-gray-400">
                <span className="flex-grow h-px bg-gray-300 mx-2"></span>
                <span>OR</span>
                <span className="flex-grow h-px bg-gray-300 mx-2"></span>
            </div>

            <p className="text-center mt-4">
                <span className="font-semibold">Don&#39;t have an account?</span>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setMoveImage(-644);
                        setLoginMove(644);
                        setSignUpButton((prev) => !prev);
                    }}
                    className="text-social-button font-bold"
                >
                    Sign Up
                </a>
            </p>
        </motion.div>
    );
};

export default LoginForm;
