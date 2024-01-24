import { Router } from '@remix-run/router';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PageNotFound } from '../components/PageNotFound';
import App from '../components/App';
import SearchResults from '../components/SearchResults/SearchResults';
import Details from '../components/Details/Details';
import { getCreditsByMovieId, getCreditsByPersonId, getCreditsByTvId, getExternalIdsByTvId, getMovieDetailsById, getPersonDetailsById, getPhotosByMovieId, getPhotosByPersonId, getPhotosByTvId, getStreamingDetailsByMovieId, getStreamingDetailsByTvId, getTVDetailsById, getVideosByMovieId, getVideosByTvId } from '../services/ServicesExport';
import AllCredits from '../components/Details/AllCredits';
import VideoGallery from '../components/Details/VideoGallery';
import PhotoGallery from '../components/Details/PhotoGallery';

const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        // errorElement: <PageNotFound />,
        children: [
            {
                path: 'search-results/:query',

                element: <SearchResults />
            },
            {
                path: 'movie/',
                children: [
                    {
                        path: 'videos/:id',
                        element: <VideoGallery />
                    },
                    {
                        path: 'credits/:id',
                        element: <AllCredits />
                    },
                    {
                        path: 'photos/:id',
                        element: <PhotoGallery />
                    },
                    {
                        path: ':id',
                        loader: async (req) => {
                            if(req.params.id) 
                                return { 
                                    mediaType: 'movie', id: req.params.id,
                                    data: [getMovieDetailsById(req.params.id), getCreditsByMovieId(req.params.id),
                                        getPhotosByMovieId(req.params.id), getVideosByMovieId(req.params.id), getStreamingDetailsByMovieId(req.params.id)]
                                }
                        },
                        element: <Details />
                    }
                ]
            },
            {
                path: 'tv/',
                children: [
                    {
                        path: 'videos/:id',
                        element: <VideoGallery />
                    },
                    {
                        path: 'credits/:id',
                        element: <AllCredits />
                    },
                    {
                        path: 'photos/:id',
                        element: <PhotoGallery />
                    },
                    {
                        path: ':id',
                        loader: async (req) => {
                            if(req.params.id) 
                                return { 
                                    mediaType: 'tv', id: req.params.id,
                                    data: [getTVDetailsById(req.params.id), getCreditsByTvId(req.params.id), 
                                        getPhotosByTvId(req.params.id), getVideosByTvId(req.params.id), getStreamingDetailsByTvId(req.params.id),
                                        getExternalIdsByTvId(req.params.id)]
                                }
                        },
                        element: <Details />
                    }
                ]
            },
            {
                path: 'person/',
                children: [
                    {
                        path: 'credits/:id',
                        element: <AllCredits />
                    },
                    {
                        path: 'photos/:id',
                        element: <PhotoGallery />
                    },
                    {
                        path: ':id',
                        loader: async (req) => {
                            if(req.params.id) 
                                return { 
                                    mediaType: 'person', id: req.params.id,
                                    data: [getPersonDetailsById(req.params.id), getCreditsByPersonId(req.params.id), getPhotosByPersonId(req.params.id)]
                                }
                        },
                        element: <Details />
                    }
                ]
            },
            {
                path: '*',
                element: <PageNotFound />
            },
        ]
    }
])

export default function AppRoutes(){
    return <RouterProvider router={router}/>
}