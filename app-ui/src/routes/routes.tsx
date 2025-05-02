import { createBrowserRouter } from "react-router";
import App from "../App";
import { DetailsContainer } from "../pages/details";
import CreditsSection from "../pages/details/credits";
import Details from "../pages/details/details";
import { MediaType } from "../context/media-context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/person/:id/",
                element: <DetailsContainer />,
                loader: async ({ params }) => {
                    const id: string | undefined = params?.id;
                    return { id, media: MediaType.PERSON };
                },
                children: [
                    {
                        path: '',
                        element: <Details />
                    },
                    {
                        path: 'credits/',
                        element: <CreditsSection />
                    },
                ]
            },
            {
                path: "/movie/:id",
                element: <DetailsContainer />,
                loader: async ({ params }) => {
                    const id: string | undefined = params?.id;
                    return { id, media: MediaType.MOVIE };
                },
                children: [
                    {
                        path: '',
                        element: <Details />
                    },
                    {
                        path: 'credits/',
                        element: <CreditsSection />
                    },
                ]
            },
            {
                path: "/tv/:id",
                element: <DetailsContainer />,
                loader: async ({ params }) => {
                    const id: string | undefined = params?.id;
                    return { id, media: MediaType.TV };
                },
                children: [
                    {
                        path: '',
                        element: <Details />
                    },
                    {
                        path: 'credits/',
                        element: <CreditsSection />
                    },
                ]
            },
        ]
    }
]);

export default router;