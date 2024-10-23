
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Landing() {
    return (
        <section>
            <Header />
            <Outlet />
        </section>
    );
}