/* AdminLayout.jsx */
import { Outlet } from "react-router-dom";
import Header from "../Components/Header"; // Make sure Header is defined
import AdminHeader from "./AdminHeader";
export default function AdminLayout() {
    return (
        <>
        {/* msh btmake sense en enta tsdhkhm el nav bar wnta admin */}
             <AdminHeader /> 
            <div className="pt-16">
                <Outlet /> {/* This renders child routes like AdminTabContent */}
            </div>
        </>
    );
}
