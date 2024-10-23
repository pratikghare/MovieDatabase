import { createBrowserRouter } from "react-router-dom";
import Details from "../components/details/Details";
import Home from "../components/Home";
import Landing from "../components/Landing";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "details/*",
                element: <Details />,
                loader: async (req) => req
            }
        ]
    }
]);