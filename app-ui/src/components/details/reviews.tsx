import { Card, CardHeader, Avatar, CardBody, ScrollShadow, CardFooter, Image } from '@heroui/react';
import { Media, Movie, Person, TvShow, Ratings, Review } from '../../context/media-context';
import HorizontalScroll from '../horizontal-scroll';
import { RottenTomatoes } from '../icons';
import { ComputedParagraph } from './details-exports';
import { StarRating } from './star-rating';
import { useSelector } from 'react-redux';
import { mediaSelector } from '../../store/selectors';

function RatingDetails({ type, className }: { type?: 'all' | 'stars' | 'others', className?: string}) {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;

    const stars: boolean = type === 'stars';
    const ratings: Array<Ratings> = !!details && ('ratings' in details) && !!details.ratings.length ? details.ratings.filter(item => !type || stars === item.showStars ) : [];
    return (
        !!ratings.length && 
        <div className={'flex flex-col gap-2 ' + (className && className)}>
            {
                ratings.map((rating: Ratings) => (
                    <div key={rating.source} className='flex items-center gap-2'>
                        { rating.showStars && <StarRating className='text-xs' percentage={rating.rating * 10} /> }

                        { rating.type === 'image' && <Image radius='none' className='pointer-events-none ' src={rating.logo} height={ rating.source === 'TMDB' ? 10: 15} ></Image> }
                        { rating.type === 'svg' && <RottenTomatoes /> }
                        { 
                            rating.type === 'box' &&  
                            <div className={'mt-1 font-bold text-xxs h-[25px] rounded-sm w-[25px] flex justify-center items-center ' + (rating.rating >= 60 ? 'bg-success' : rating.rating >= 40 ? 'bg-warning' : 'bg-danger')}>
                                { rating.rating }%
                            </div>
                        }
                        { rating.type === 'svg' && <p className='text-xs'>{ rating.rating }{ rating.scale === 100 && '%' }</p> }
                        { rating.label && <p className='text-xs mt-1'>{ rating.label }</p> }
                    </div>
                ))
            }
        </div>
    )
}

export default function ReviewDetails() {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const ratings: Array<Ratings> = !!details && ('ratings' in details) && !!details.ratings.length ? details.ratings : [];
    const reviews: Array<Review> = !!details && ('reviews' in details) && !!details.reviews.list.length ? details.reviews.list : [];
    return (
        !!ratings.length || !!reviews.length ?
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold'>Reviews</h1>
                {
                    !!reviews.length &&
                    <HorizontalScroll className='flex gap-2 !bg-transparent pb-1 '>
                        {
                            reviews.map((review: Review) => (
                                <Card key={review.id} className='min-w-[300px] shadow-none border-1 border-foreground/10'>
                                    <CardHeader className='justify-between'>
                                        <div className='flex gap-2'>
                                            <Avatar
                                                isBordered
                                                radius='full'
                                                size='sm'
                                                src={review.author.image}
                                                showFallback
                                            />
                                            <div className='flex flex-col gap-1 items-start justify-center'>
                                                <h4 className='text-xs font-semibold leading-none text-default-600'>{review.author.name}</h4>
                                                <h5 className='text-xs tracking-tight text-default-400'>@{review.author.username}</h5>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className='px-3 py-0 text-small text-default-400 backdrop'>
                                        <ScrollShadow hideScrollBar className={'max-h-[120px] text-xs ' + (!!review.author.rating && 'max-h-[100px]')}>
                                            <ComputedParagraph text={review.content} id={'review-' + review.id} />
                                        </ScrollShadow>
                                    </CardBody>
                                    {
                                        !!review.author.rating &&
                                        <CardFooter className='gap-4 p-1 px-3'>
                                            <div className='flex gap-1'>
                                                <StarRating percentage={review.author.rating * 10} className={'text-default-400 text-semibold text-xs'} />
                                            </div>
                                        </CardFooter>
                                    }
                                </Card>
                            ))
                        }
                    </HorizontalScroll>
                }
                <RatingDetails className={reviews.length ? 'px-2' : ''} />
            </div> : <></>
    );
}