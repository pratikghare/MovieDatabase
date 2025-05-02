import { useSelector } from "react-redux";
import { getCleanText, updateArrayUsingProperty } from "../../utils/utils";
import { mediaSelector } from "../../store/selectors";
import { useState, useEffect } from "react";
import { Movie, Person, TvShow, Media, WatchProvider, ProductionCompany } from "../../context/media-context";
import { Image } from "@heroui/react";

export function ComputedParagraph({ text, id }: { text: string, id: string }) {
    const list: Array<string> = text?.length ? text.split('\n').filter(Boolean) : [];
    return (
        !!list.length && list.map((item: string, index) => (
            <p key={id + '-' + index}>{getCleanText(item)}</p>
        ))
    )
}

export function RevenueDetails() {
    const details: Movie | Person | TvShow | Media | undefined  = useSelector(mediaSelector).details;
    const [list, setList] = useState<Array<{ key: string, title: string, value: string }>>([]);

    useEffect(() => {
        if (!details) return setList([]);
        const array: Array<{ key: string, title: string, value: string }> = [];
        updateArrayUsingProperty(array, 'budget', details, 'Budget');
        updateArrayUsingProperty(array, 'revenue', details, 'Revenue');
        updateArrayUsingProperty(array, 'boxOffice', details, 'Box Office Collection');
        if (array.length) updateArrayUsingProperty(array, 'productionCountries', details, 'Production Countries');
        setList(array);
    }, [details]);

    return (
        !!list?.length &&
        <div className={'flex gap-4 flex-wrap ' + (list.length > 1 ? 'justify-evenly' : 'px-2')}>
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

export function StreamingPlatforms() {
    const details: Movie | Person | TvShow | Media | undefined  = useSelector(mediaSelector).details;

    return (
        details && ('watchProviders' in details) && (!!details.watchProviders.subscription.length || !!details.watchProviders.buy.length || !!details.watchProviders.rent.length) &&
        <div className='flex gap-5 flex-wrap pb-2'>
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
                        <div key={provider.id + provider.displayPriority} className='flex flex-col gap-1 items-center max-w-[80px]'>
                            <Image src={provider.path} radius='lg' className='pointer-events-none object-cover border-1 border-foreground/10 h-[35px] sm:h-[45px]' alt={provider.name} />
                            {/* <p className='text-xxs hidden sm:flex font-thin text-center'>{provider.name}</p> */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export function Companies() {
    const details: Movie | Person | TvShow | Media | undefined  = useSelector(mediaSelector).details;
    
    return (
        details && ('productionCompanies' in details) && !!details.productionCompanies?.length &&
        <div>
            <h1 className='font-bold my-1 '>Production Companies</h1>
            <div className='flex gap-4 flex-wrap'>
                {
                    details.productionCompanies.map((company: ProductionCompany) => (
                        <div key={company.id} className={'flex flex-col items-center gap-2 dark:text-background dark:bg-white/90 p-1 rounded-md justify-center text-xs border-2 ' + (!details.backdrop && 'light:border-foreground/50')}>
                            {
                                company.path ?
                                    <Image src={company.path} radius='none' className='h-[20px] md:h-[30px] pointer-events-none' alt={company.name} /> :
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