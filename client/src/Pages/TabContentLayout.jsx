/* eslint-disable react/prop-types */
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../custom.css";

function TabContentLayout({ handleTabs, setHandleTabs, focus, setFocus }) {
    const location = useLocation();

    const pageVariants = {
        hidden: { opacity: 0, x: -50 }, // Initial state: fades out and slides left
        visible: { opacity: 1, x: 0 }, // Animate to this state: fully visible
    };

    return (
        <div className="main-content">
            <Sidebar handleTabs={handleTabs} setHandleTabs={setHandleTabs} focus={focus} setFocus={setFocus} />
            <div className="tab-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="hidden"
                        animate="visible"
                        exit={false} // Disable exit animation
                        transition={{ duration: 0.4 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default TabContentLayout;
