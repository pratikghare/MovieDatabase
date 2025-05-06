import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Genre, Image as ImageType, MediaType, PAGES } from '../../context/media-context';
import { useSelector } from 'react-redux';
import { configSelector, mediaSelector, useAppDispatch } from '../../store/selectors';
import { Button, Chip, Image, Link } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, ShareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { updateBackgroundColor, updateComingFrom } from '../../store/reducers/config-reducer';
import { DotIcon, GalleryGridIcon } from '../../components/icons';
import HorizontalScroll from '../../components/horizontal-scroll';
import { clearDetails } from '../../store/reducers/media-reducer';

interface LoaderParams {
    mediaId: string | undefined;
    mediaType: MediaType;
}
const FULL_WIDTH_OFFSET = 20;
export default function ImageViewer() {
    const params = useLoaderData() as LoaderParams;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<Array<ImageType>>([]);
    const [toggle, setToggle] = useState<boolean>(true);
    const [comingFrom, setComingFrom] = useState<PAGES>(PAGES.HOME);

    const details = useSelector(mediaSelector).details;
    const config = useSelector(configSelector);

    const navigateToDetails = () => {
        if (details) navigate(`/${details.mediaType}/${details.id}/`);
    }

    useEffect(() => {
        setComingFrom(config.comingFrom);
        dispatch(updateComingFrom(PAGES.IMAGE_VIEWER));
    }, []);

    useEffect(() => {
        const key: string | undefined = params.mediaId;

        if (images && key) {
            const item: number = images.findIndex(i => i.path.includes(key));
            setCurrentIndex(item);
        }
        dispatch(updateBackgroundColor(undefined));
    }, [images, location.pathname, params]);

    useEffect(() => {
        if (details?.images?.list) setImages(details.images.list);
        else setImages([]);
    }, [details]);

    const navigateToMedia = (id?: number) => {
        if (details) {
            navigate(`/${details.mediaType}/${details.id}/media${id !== undefined ? images[id].key : '/'}`)
        }
    }

    const close = () => {
        if (comingFrom === PAGES.DETAILS) navigateToDetails();
        else if (comingFrom === PAGES.HOME) {
            dispatch(clearDetails())
            navigate('/');
        }
        else navigateToMedia();
    }

    const gallery = () => {
        navigateToMedia();
    }

    const next = () => {
        if (images) navigateToMedia(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    }

    const prev = () => {
        if (images) navigateToMedia(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    }

    return (
        <section onClick={() => setToggle(!toggle)}
            className='fixed flex justify-center items-center z-40 bg-background lg:left-[calc((1024px_-_100svw)_/_2)] top-[-64px] max-h-svh h-svh w-svw'
            style={{ zIndex: 9 }}
        >
            {
                !!images?.length && currentIndex >= 0 && <Image src={images[currentIndex].path} className='max-h-svh z-40' radius='none' />
            }
            {
                !!details && toggle &&
                <div className='absolute w-full h-svh max-w-[1024px] flex flex-col justify-between z-40'>
                    <div className='bg-background/60 flex justify-between items-center px-2 py-4 lg:rounded-b-md border-b-1 lg:border-l-1 lg:border-r-1 border-foreground-100'>
                        <Button variant='light' radius='sm' className='p-0' onPress={close}>
                            {
                                comingFrom === PAGES.HOME ? 
                                <>
                                    <HomeIcon className='size-4' />
                                    <span>Home</span>
                                </> :
                                <>
                                    <XMarkIcon className='size-4' />
                                    <span>Close</span>
                                </>
                            }
                        </Button>

                        <div className='flex gap-2 items-center'>
                            <p className='text-warning'>{currentIndex+1} of {images.length}</p>

                            <Button isIconOnly variant='light' radius='sm' onPress={gallery}>
                                <GalleryGridIcon className='size-6' />
                            </Button>

                            <Button isIconOnly variant='light' radius='sm'>
                                <ShareIcon className='size-5' />
                            </Button>
                        </div>
                    </div>
                    <div className='bg-background/60 flex justify-between p-2 py-4 border-t-1 lg:border-l-1 lg:border-r-1 lg:px-4 lg:rounded-t-md border-foreground-100'>
                        <div className='flex-1'>
                            <Link onPress={navigateToDetails} 
                                className='font-bold hover:underline cursor-pointer'>
                                    {details.name}
                            </Link>
                            <HorizontalScroll offset={FULL_WIDTH_OFFSET} className='text-xs flex items-center mt-2'>
                                {
                                    details.subtext.map((text: string, index: number) => (
                                        <div key={details.id + 'sub-text-' + index} className='flex items-center'>
                                            <Chip variant='light' className='h-auto text-xs px-0 [&>span]:px-0 '>
                                                {text}
                                            </Chip>
                                            {index < (details.subtext.length - 1) && <DotIcon />}
                                        </div>
                                    ))
                                }
                            </HorizontalScroll>
                            <HorizontalScroll offset={FULL_WIDTH_OFFSET} className='text-xs flex items-center mt-1'>
                                {
                                    !!details.genres && !!details.genres?.length ?
                                        details.genres.map((genre: Genre, index: number) => (
                                            <div key={details.id + 'genre-' + index} className='flex items-center'>
                                                <Chip variant='light' className='h-auto text-xs px-0 [&>span]:px-0 '>
                                                    {genre.name}
                                                </Chip>
                                                {index < ((details.genres ?? []).length - 1) && <DotIcon />}
                                            </div>
                                        )) : <></>
                                }
                            </HorizontalScroll>
                        </div>
                    </div>
                </div>
            }
            {
                toggle &&
                <div className='absolute top-0 left-0 flex justify-between items-center w-full h-svh px-4'>
                    <Button isIconOnly variant='bordered' className='border-1 bg-background/60 z-50' radius='sm' onPress={prev}>
                        <ChevronLeftIcon className='size-5' />
                    </Button>
                    <Button isIconOnly variant='bordered' className='border-1 bg-background/60 z-50' radius='sm' onPress={next}>
                        <ChevronRightIcon className='size-5' />
                    </Button>
                </div>
            }
        </section>
    );
}