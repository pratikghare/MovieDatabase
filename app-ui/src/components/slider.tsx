// MyImageSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { CompactMedia } from '../context/media-context';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Chip, Image, Skeleton } from '@heroui/react';
import { StarRating } from './details/star-rating';
import { DotIcon } from './icons';
import { useNavigate } from 'react-router';

interface ClassNames {
    base?: string;
    image?: string;
}
interface SliderProps {
    title?: string;
    list: CompactMedia[];
    classNames?: ClassNames;
    className?: string;
    showSkeleton?: boolean;
    showNavigation?: boolean;
    clickablePagination?: boolean;
    showPagination?: boolean;
}

export default function Slider({ list, classNames, title, showSkeleton, showNavigation, clickablePagination, showPagination }: SliderProps) {
    const dimensions = useWindowDimensions();
    const navigate = useNavigate();

    const navigateToDetails = (item: CompactMedia) => {
        navigate(`${item.mediaType}/${item.id}`);
    }

    return (
        <section className={'' + (classNames?.base ? classNames.base : '')}>
            { !showSkeleton && title && <h1 className='font-bold mb-1 text-xs sm:text-sm'>{title}</h1> }
            {
                showSkeleton && title &&
                <div className='w-full flex flex-col gap-2 overflow-hidden'>
                    <Skeleton className='h-3 w-1/5 rounded-lg' />
                </div>
            }
            {
                !!list.length &&
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    speed={800}
                    pagination={{ clickable: !!clickablePagination, enabled: !!showPagination }}
                    
                    navigation={showNavigation}
                    autoplay={{ delay: 8000 }}
                    loop
                >
                    {
                        list.map((item: CompactMedia, index) => (
                            <SwiperSlide key={index}>
                                {
                                    dimensions.width > 700 ?
                                        <div
                                            onClick={() => navigateToDetails(item)}
                                            className={'h-[300px] sm:h-[400px] cursor-pointer w-full relative ' + (classNames?.image ? classNames.image : '')}
                                            style={{ background: `url('${item.backdrop}') center / cover` }}
                                        >
                                            <Details details={item} className={classNames?.image} onClick={() => navigateToDetails(item)} />
                                        </div> :
                                        <div
                                            onClick={() => navigateToDetails(item)}
                                        >
                                            <Image
                                                className={'pointer-events-none -z-10 ' + (classNames?.image ? classNames.image : '')}
                                                radius='none'
                                                src={item.backdrop}
                                                alt={`Slide ${index + 1}`}
                                            />
                                            <Details details={item} className={classNames?.image} onClick={() => navigateToDetails(item)} />
                                        </div>
                                }
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
            {
                !list.length && showSkeleton &&
                <Skeleton className={'h-[250px] lg:h-[400px] w-full mt-2 ' + (classNames?.image ? classNames.image : '')}>
                    <div className='h-full w-full rounded-lg bg-secondary' />
                </Skeleton>
            }

        </section>
    );
}


function Details({ details, className, onClick }: { details: CompactMedia, className?: string, onClick?: Function }) {
    return (
        <div onClick={() => onClick ? onClick() : null} className={'absolute bottom-0 z-10 bg-gradient-to-t from-background to-transparent min-h-[50%] w-full p-4 flex items-end ' + (className ? className : '')}>
            <div className='flex flex-col sm:gap-1'>
                {details.voteAverage && <StarRating className='text-xxs sm:!text-xs' percentage={Math.round(details.voteAverage * 10)} />}
                <h1 className='font-bold text-xs sm:text-sm'>{details.name}</h1>
                <div className='flex'>
                    {
                        details.subtext.map((text: string, index: number) => (
                            <div key={details.id + 'sub-text-' + index} className='flex items-center'>
                                <Chip variant='light' className={'h-auto text-xxs sm:!text-xs px-0 [&>span]:px-0 ' + (index === 0 && ('rated' in details) && details.rated ? 'border-1 rounded-sm border-foreground-600 p-1 px-2' : '')}>
                                    {text}
                                </Chip>
                                {index < (details.subtext.length - 1) && <DotIcon />}
                            </div>
                        ))
                    }
                </div>
                <p className='text-xxs sm:!text-xs'>{details.overview}</p>
            </div>
        </div>
    );
}