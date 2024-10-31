import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout({pointer}) {
    return (
        <>
            <Navbar pointer={pointer}/>
            <Outlet />
        </>
    )
}

export default Layout;