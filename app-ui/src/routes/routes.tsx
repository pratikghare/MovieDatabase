import { createBrowserRouter } from "react-router";
import App from "../App";
import { DetailsContainer } from "../pages/details";
import CreditsSection from "../pages/details/credits";
import Details from "../pages/details/details";
import { MediaType } from "../context/media-context";
import Seasons from "../pages/details/seasons";
import PageNotFound from "../pages/page-not-found";
import ImagesVideos from "../pages/details/image-videos";
import ImageViewer from "../pages/details/image-viewer";

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
                    {
                        path: 'media/:mediaId',
                        element: <ImageViewer />,
                        loader: async ({ params }) => {
                            const mediaId: string | undefined = params?.mediaId;
                            return { mediaId, media: MediaType.PERSON };
                        },
                    },
                    {
                        path: 'media/',
                        element: <ImagesVideos />,
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
                    {
                        path: 'media/:mediaId',
                        element: <ImageViewer />,
                        loader: async ({ params }) => {
                            const mediaId: string | undefined = params?.mediaId;
                            return { mediaId, media: MediaType.MOVIE };
                        },
                    },
                    {
                        path: 'media/',
                        element: <ImagesVideos />,
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
                    {
                        path: 'seasons/:seasonNumber',
                        element: <Seasons />
                    },
                    {
                        path: 'media/:mediaId',
                        element: <ImageViewer />,
                        loader: async ({ params }) => {
                            const mediaId: string | undefined = params?.mediaId;
                            return { mediaId, media: MediaType.TV };
                        },
                    },
                    {
                        path: 'media/',
                        element: <ImagesVideos />,
                    },
                ]
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
]);

export default router;