import { Outlet } from "react-router-dom";
import MainNavigations from "../components/MainNavigations";

function RootLayout() {
    return <>
        <MainNavigations />
        <main>
            <Outlet />
        </main>

    </>
}
export default RootLayout;