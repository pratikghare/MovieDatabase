
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Footer } from "./Footer";

export default function Landing() {
    return (
        <section className="h-[100vh] flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </section>
    );
}