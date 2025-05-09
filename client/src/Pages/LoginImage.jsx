/* eslint-disable react/prop-types */
import loginImage from '../assets/AutoInsight.png'; // Replace with your actual image file if needed
import {motion} from "framer-motion"


const LoginImage = ({image, ...props }) => {
    return (
    <motion.div animate={{x:image}} {...props}>
        <img src={loginImage} alt="Login Visual" />
    </motion.div>
    );

}
export default LoginImage;