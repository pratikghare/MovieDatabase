import { createBrowserRouter } from 'react-router';
import App from '../App';
import { DetailsContainer } from '../pages/details';
import CreditsSection from '../pages/details/credits';
import Details from '../pages/details/details';
import { MediaType } from '../context/media-context';
import Seasons from '../pages/details/seasons';
import PageNotFound from '../pages/page-not-found';
import ImageViewer from '../pages/details/image-viewer';
import Photos from '../pages/details/photos';
import Videos from '../pages/details/videos';
import Home from '../pages/home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/person/:id/',
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
                        element: <Photos />,
                    },
                ]
            },
            {
                path: '/movie/:id',
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
                        element: <Photos />,
                    },
                    {
                        path: 'videos/',
                        element: <Videos />,
                    },
                ]
            },
            {
                path: '/tv/:id',
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
                        element: <Photos />,
                    },
                    {
                        path: 'videos/',
                        element: <Videos />,
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