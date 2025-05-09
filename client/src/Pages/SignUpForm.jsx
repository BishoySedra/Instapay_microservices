import { useState } from "react";
import { motion } from "framer-motion";
import DollarLogo from "../assets/InstaPayIcon.svg";
import axios from "axios"; // Import Axios for API requests
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons
import { toast } from "react-toastify";

const SignUpForm = ({ setMoveImage, loginMove, setLoginMove, setSignUpButton }) => {
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [enteredValues, setEnteredValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.(com)$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/; // Username: min 3 chars, alphanumeric only

    function handleInputChange(identifier, value) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [identifier]: "",
        }));
        setEnteredValues((prevEnteredValues) => ({
            ...prevEnteredValues,
            [identifier]: value,
        }));
    }

    function validateUsername() {
        if (!enteredValues.name) return "Username is required.";
        if (!usernameRegex.test(enteredValues.name)) {
            return "Username must be at least 3 characters long and contain only letters and numbers.";
        }
        return "";
    }

    function validateEmail() {
        if (!enteredValues.email) return "Email is required.";
        if (!emailRegex.test(enteredValues.email)) return "Please enter a valid email address with '.com' domain.";
        return "";
    }

    function validatePassword() {
        if (!enteredValues.password) return "Password is required.";
        if (!passwordRegex.test(enteredValues.password)) {
            return "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.";
        }
        return "";
    }

    function validateConfirmPassword() {
        if (!enteredValues.confirmPassword) return "Confirm password is required.";
        if (enteredValues.confirmPassword !== enteredValues.password) {
            return "Passwords do not match.";
        }
        return "";
    }

    async function handleSignUp(event) {
        event.preventDefault();
        const userServiceUrl = import.meta.env.VITE_USER_SERVICE_URL;
        const usernameErrorMessage = validateUsername();
        const emailErrorMessage = validateEmail();
        const passwordErrorMessage = validatePassword();
        const confirmPasswordErrorMessage = validateConfirmPassword();

        if (usernameErrorMessage || emailErrorMessage || passwordErrorMessage || confirmPasswordErrorMessage) {
            setErrors({
                name: usernameErrorMessage,
                email: emailErrorMessage,
                password: passwordErrorMessage,
                confirmPassword: confirmPasswordErrorMessage,
            });
            return;
        }

        try {
            const response = await axios.post(`${userServiceUrl}/api/auth/register`, {
                username: enteredValues.name,
                email: enteredValues.email,
                password: enteredValues.password,
            });

            console.log("Sign Up successful!", response.data);
            setEnteredValues({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
            });
            setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            toast.success("Signup successful! Please head to the login page again.");
            setMoveImage(0);
            setLoginMove(0);
            setSignUpButton((prev) => !prev);
        } catch (error) {
            console.error("Signup error:", error.response);
            console.error("Signup error:", error.response.message);
            console.error("Signup error:", error.message);
            

            if (error.response && error.response.data.message) {
                console.log(error.message);
                
                const errorMessage = error.response.data.message;
                if (errorMessage.includes("index: username_1 dup key")) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        name: "This username is already taken. Please choose another one.",
                    }));
                } else if (errorMessage.includes("index: email_1 dup key")) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "This email is already taken. Please use another one.",
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "An error occurred. Please try again later.",
                    }));
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "An error occurred. Please try again later.",
                }));
            }
        }
    }

    return (
        <motion.div animate={{ x: loginMove }} className="w-1/2 p-12 flex flex-col justify-center bg-white mr-10">
            <div className="text-center">
                <img src={DollarLogo} alt="Robot Photo" className="w-[100px] mx-auto mb-6" />
                <h2 className="text-3xl font-semibold text-welcome-text-h2 mb-4">Join us by creating an account</h2>
                <h1 className="text-7xl font-bold text-welcome-text-h1">Hi There!</h1>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSignUp}>
                {/* Username Field */}
                <div className="space-y-2">
                    <label htmlFor="name" className={`block text-sm font-bold ${errors.name ? "text-red-500" : "text-purple-800"}`}>
                        Username
                    </label>
                    <input
                        id="name"
                        className={`w-full p-3 text-sm border rounded-md ${errors.name ? "border-red-400 bg-red-100" : "border-gray-300"}`}
                        onChange={(event) => handleInputChange("name", event.target.value)}
                        type="text"
                        placeholder="Enter your username"
                        value={enteredValues.name}
                    />
                    <p className="text-red-500 text-sm mt-1 h-5">{errors.name || ""}</p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className={`block text-sm font-bold ${errors.email ? "text-red-500" : "text-purple-800"}`}>
                        Email
                    </label>
                    <input
                        value={enteredValues.email}
                        id="email"
                        className={`w-full p-3 text-sm border rounded-md ${errors.email ? "border-red-400 bg-red-100" : "border-gray-300"}`}
                        onChange={(event) => handleInputChange("email", event.target.value)}
                        type="email"
                        placeholder="Enter your email"
                    />
                    <p className="text-red-500 text-sm mt-1 h-5">{errors.email || ""}</p>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className={`block text-sm font-bold ${errors.password ? "text-red-500" : "text-purple-800"}`}>
                        Password
                    </label>
                    <div className="relative">
                        <input
                            value={enteredValues.password}
                            id="password"
                            className={`w-full p-3 text-sm border rounded-md ${errors.password ? "border-red-400 bg-red-100" : "border-gray-300"}`}
                            onChange={(event) => handleInputChange("password", event.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                        </button>
                    </div>
                    <p className="text-red-500 text-sm mt-1 h-5">{errors.password || ""}</p>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className={`block text-sm font-bold ${errors.confirmPassword ? "text-red-500" : "text-purple-800"}`}>
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            value={enteredValues.confirmPassword}
                            id="confirmPassword"
                            className={`w-full p-3 text-sm border rounded-md ${errors.confirmPassword ? "border-red-400 bg-red-100" : "border-gray-300"}`}
                            onChange={(event) => handleInputChange("confirmPassword", event.target.value)}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showConfirmPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                        </button>
                    </div>
                    <p className="text-red-500 text-sm mt-1 h-5">{errors.confirmPassword || ""}</p>
                </div>

                {/* Terms and Conditions */}
                <p className="text-xs text-gray-500 text-center mt-3">
                    Use 8 or more characters with at least one capital letter, one number, and one special character.
                    <br />
                    By signing up, you agree to the{" "}
                    <a className="text-purple-600 font-bold" href="#">
                        Terms of Use
                    </a>{" "}
                    and{" "}
                    <a className="text-purple-600 font-bold" href="#">
                        Privacy Policy
                    </a>
                    .
                </p>

                {/* Sign Up Button */}
                <button
                    type="submit"
                    className="ml-14 w-[392px] bg-social-button text-white p-3 rounded-md hover:bg-purple-700 transition mb-4"
                >
                    Sign Up
                </button>
           </form>

            {/* Link to Login */}
            <p className="text-center mt-3 mb-8">
                <span>Already have an account?</span>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setMoveImage(0);
                        setLoginMove(0);
                        setSignUpButton((prev) => !prev);
                    }}
                    className="text-social-button font-bold"
                >
                    Log in
                </a>
            </p>
        </motion.div>
    );
};

export default SignUpForm;