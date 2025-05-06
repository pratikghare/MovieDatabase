import { useSelector } from 'react-redux';
import { mediaSelector, useAppDispatch } from '../../store/selectors';
import { useEffect, useId, useState } from 'react';
import { CompactMedia, Credits, MediaType, PAGES } from '../../context/media-context';
import { Card, CardHeader, CardBody, Image as HeroImage, Input, ScrollShadow, Avatar, Chip, Skeleton } from '@heroui/react';
import { useNavigate } from 'react-router';
import { getMappedCredits, navigateToDetails } from '../../utils/utils';
import CommonDetailsNav from '../../components/details/common-details-nav';
import HorizontalScroll from '../../components/horizontal-scroll';
import { DotIcon } from '../../components/icons';
import { updateComingFrom } from '../../store/reducers/config-reducer';

const FULL_WIDTH_OFFSET = 120;
function CreditBox({ list, title, className, media }: { list: Array<CompactMedia>, title: string, className?: string, media?: MediaType }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const id = useId();

    const avatarClasses = media === MediaType.PERSON ? 'max-h-[90px] max-w-[60px]' : 'w-[50px] h-[50px]';
    const classes = (className ? className : '') + (media === MediaType.PERSON ? ' border-none' : '');

    const onItemClick = (media: CompactMedia) => navigateToDetails(media, navigate, dispatch);

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.CREDITS));
    }, []);

    return (
        !media || !!list.length ?
        <Card radius='sm' className={'my-2 shadow-none border-2 border-foreground/10 bg-transparent ' + classes}>
            <CardHeader>
                {
                    !!media ?
                        <h4 className='font-bold text-sm lg:text-large sm:text-medium'>{title}</h4> :
                        <Skeleton className='h-3 w-5/5 min-w-[200px] rounded-lg' />
                }
            </CardHeader>
            <CardBody className='overflow-visible py-2 flex flex-col gap-2'>
                {
                    !!media ?
                        list.map((item: CompactMedia, index) => (
                            <div key={title + item.id + index} className='flex gap-5 items-center'>
                                <div>
                                    {
                                        media === MediaType.PERSON ? <HeroImage className={'object-cover ' + avatarClasses} radius={media === MediaType.PERSON ? 'sm' : 'full'} src={item.thumbnail} /> :
                                            <Avatar size='md' src={item.thumbnail?.includes('not_found') ? undefined : item.thumbnail} />
                                    }
                                </div>
                                {
                                    media !== MediaType.PERSON ?
                                        <div className='flex-1 sm:flex sm:justify-evenly'>
                                            <h2 onClick={() => onItemClick(item)}
                                                className={'text-primary hover:underline flex-1 text-xs md:text-sm ' + (item.character ? 'border-b-1 border-transparent sm:hover:no-underline sm:hover:border-foreground-200 cursor-pointer' : 'cursor-pointer')}>
                                                {item.name}
                                            </h2>
                                            <p className='flex-1 text-xs'>{item.character}</p>
                                        </div> :
                                        <div className='flex flex-col justify-center gap-2 text-xs'>
                                            <h2 onClick={() => onItemClick(item)} className='text-primary cursor-pointer hover:underline flex-1 text-xs md:text-sm font-bold'>{item.name}</h2>
                                            <HorizontalScroll offset={FULL_WIDTH_OFFSET} className='text-xs flex items-center'>
                                                {
                                                    item.subtext.map((text: string, index: number) => (
                                                        <div key={item.id + 'sub-text-' + index} className='flex items-center'>
                                                            <Chip variant='light' className='h-auto text-xs px-0 [&>span]:px-0'>{text}</Chip>
                                                            {index < (item.subtext.length - 1) && <DotIcon />}
                                                        </div>
                                                    ))
                                                }
                                            </HorizontalScroll>
                                            <p className='flex-1'>..as {item.character}</p>
                                        </div>
                                }
                            </div>
                        )) :
                        Array(4).fill(1).map((_, index: number) => (
                            <div className='flex gap-5 min-w-[100px] items-center' key={'skeleton-' + id + index}>
                                <Skeleton className='rounded-full h-[40px] w-[40px]' >
                                    <div className='h-full wi-full rounded-lg bg-secondary' />
                                </Skeleton>
                                <Skeleton className='h-3 min-w-[100px] rounded-lg' />
                                <Skeleton className='h-3 flex-1 min-w-[200px] rounded-lg' />
                                <Skeleton className='h-3 flex-1 min-w-[200px] rounded-lg' />
                            </div>
                        ))
                }
            </CardBody>
        </Card> : <></>
    )
}

const inital: Credits = { writers: [], directors: [], cast: [], crew: [] };

export default function CreditsSection() {
    const details = useSelector(mediaSelector).details;

    const [credits, setCredits] = useState<Credits>(inital);
    const [filteredCredits, setFilteredCredits] = useState<Credits>(inital);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (!!value.length) {
            const updated: Credits = {
                directors: credits.directors ? filterData(value, credits.directors) : [],
                writers: credits.writers ? filterData(value, credits.writers) : [],
                cast: credits.cast ? filterData(value, credits.cast) : [],
                crew: credits.crew ? filterData(value, credits.crew) : []
            }

            setFilteredCredits(updated);
        }
        else setFilteredCredits(credits);
    }, [value]);

    useEffect(() => {
        if (details?.credits) {
            setCredits(getMappedCredits(details.credits));
            setFilteredCredits(getMappedCredits(details.credits))
        }
        else {
            setCredits(inital);
            setFilteredCredits(inital);
        }
    }, [details]);

    const filterData = (value: string, list: Array<CompactMedia>): Array<CompactMedia> => {
        return list.filter((item: CompactMedia) => (
            String(item.name).toLocaleLowerCase().includes(String(value).toLocaleLowerCase()) ||
            String(item.character).toLocaleLowerCase().includes(String(value).toLocaleLowerCase())
        ))
    }


    return (
        <section className='pt-[15px] bg-background/60 px-2'>
            <CommonDetailsNav hideDivider details={details} title='All Credits' />
            <div className='z-50 flex justify-center items-center'>
                <div className='top-2 w-full'>
                    {
                        details ?
                        <Input variant='bordered' onChange={(event: any) => setValue(event.target.value)} radius='sm' placeholder='Search list' className='pratik' classNames={{ input: 'text-xs font-bold', inputWrapper: 'border-foreground/40' }} />
                        : <Skeleton className='h-6 flex-1 my-3 min-w-[200px] rounded-lg' />
                    }
                </div>
            </div>
            <ScrollShadow hideScrollBar className='max-h-[calc(100svh_-_164px_-_48px)]'>
                <CreditBox list={filteredCredits.directors} media={details?.mediaType} title='Directors' />
                <CreditBox list={filteredCredits.writers} media={details?.mediaType} title='Writers' />
                <CreditBox list={filteredCredits.cast} media={details?.mediaType} title={details?.mediaType === MediaType.PERSON ? 'All filmography' : 'Top Cast'} />
                <CreditBox list={filteredCredits.crew} media={details?.mediaType} title='All Crew' />
            </ScrollShadow>
        </section>
    );
}