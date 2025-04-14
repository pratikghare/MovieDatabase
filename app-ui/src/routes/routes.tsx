import { createBrowserRouter } from "react-router";
import App from "../App";
import Details from "../pages/details/details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/person/:id",
                element: <Details />,
            },
            {
                path: "/movie/:id",
                element: <Details />,
            },
            {
                path: "/tv/:id",
                element: <Details />,
            }
        ]
    }
]);

export default router;