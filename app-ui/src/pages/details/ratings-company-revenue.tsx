import { Image } from '@heroui/react';
import { Media, Movie, Person, ProductionCompany, Ratings, TvShow, WatchProvider } from '../../context/media-context';
import { useEffect, useState } from 'react';
import { updateArrayUsingProperty } from '../../utils/utils';

interface MetaProps {
    details?: Media | Movie | Person | TvShow;
}


export function Companies({ details }: MetaProps) {
    return (
        details && ('productionCompanies' in details) && !!details.productionCompanies?.length &&
        <div>
            <h1 className='font-bold my-1 '>Production Companies</h1>
            <div className='flex gap-4 flex-wrap'>
                {
                    details.productionCompanies.map((company: ProductionCompany) => (
                        <div className='flex flex-col items-center gap-2 dark:text-background dark:bg-white/90 p-1 rounded-md justify-center text-xs border-2'>
                            {
                                company.path ?
                                    <Image src={company.path} radius='none' className='h-[30px] sm:h-[50px]' alt={company.name} /> :
                                    <p>{company.name}</p>
                            }
                            {/* <p className='text-xxs sm:text-xs sm:font-thin'>{company.name}</p> */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export function RevenueDetails({ details }: MetaProps) {
    const [list, setList] = useState<Array<{ key: string, title: string, value: string }>>([]);

    useEffect(() => {
        if (!details) return setList([]);
        const array: Array<{ key: string, title: string, value: string }> = [];
        updateArrayUsingProperty(array, 'budget', details, 'Budget');
        updateArrayUsingProperty(array, 'revenue', details, 'Revenue');
        updateArrayUsingProperty(array, 'boxOffice', details, 'Box Office Collection');
        if(array.length) updateArrayUsingProperty(array, 'productionCountries', details, 'Production Countries');
        setList(array);
    }, [details]);

    return (
        !!list?.length &&
        <div className={'flex gap-4 flex-wrap py-3 ' + (list.length > 1 ? 'justify-evenly' : 'px-2')}>
            {
                list?.map(item => (
                    <div key={item.key} className='text-xs sm:text-sm flex flex-col items-center'>
                        <span className='font-bold text-primary'>{item.title}</span>
                        <span className='text-center'>{item.value}</span>
                    </div>
                ))
            }
        </div>
    );
}

export function RatingDetails({ details }: MetaProps) {
    return (
        details && ('ratings' in details) && !!details.ratings.length &&
        <div>
            <h1 className='font-bold my-1 '>Ratings from sources</h1>
            {
                <div className='flex gap-6'>
                    {
                        details.ratings.map((item: Ratings) => (
                            <div className={'flex items-center flex-wrap justify-center gap-1 ' + (!item.logo && 'flex-col mt-2')}>
                                {
                                    !!item.logo ?
                                        <Image src={item.logo} height={45} className='object-cover min-w-[45px]' alt={item.source + item.rating} /> :
                                        <div className={
                                            'h-[45px] w-[45px] flex justify-center items-center font-bold rounded-md ' +
                                            (item.scale === '100' && (item.rating >= '60' ? 'bg-success' : item.rating >= '40' ? 'bg-warning' : 'bg-danger'))
                                        }>
                                            {item.rating}
                                            {item.scale === '100' && '%'}
                                        </div>
                                }
                                {item.logo && <p className='!leading-none'>{item.rating} {item.scale === '100' && '%'}</p>}
                                {<p className='text-xxs'>{item.label}</p>}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export function StreamingPlatforms({ details }: MetaProps) {
    return (
        details && ('watchProviders' in details) && (!!details.watchProviders.subscription.length || !!details.watchProviders.buy.length || !!details.watchProviders.rent.length) &&
        <div className='flex gap-5 flex-wrap pb-6'>
            <RenderWatchProvider providers={details.watchProviders.subscription} title='Available on' />
            <RenderWatchProvider providers={details.watchProviders.buy} title='Buy from' />
            <RenderWatchProvider providers={details.watchProviders.rent} title='Available for Rent on' />
        </div>
    );
}

function RenderWatchProvider({ providers, title }: { providers: Array<WatchProvider>, title: string }) {
    return (
        !!providers.length &&
        <div className='flex flex-col gap-2'>
            <p className='text-xxs uppercase sm:font-thin'>{title}</p>
            <div className='flex space-x-2'>
                {
                    providers.map((provider: WatchProvider) => (
                        <div key={provider.id + provider.displayPriority} className='flex flex-col  gap-1 items-center max-w-[80px]'>
                            <Image src={provider.path} className='object-cover border-1 border-foreground/10 h-[35px] sm:h-[50px]' alt={provider.name} />
                            <p className='text-xxs hidden sm:flex font-thin text-center'>{provider.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}