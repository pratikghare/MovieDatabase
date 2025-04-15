import { CompactMedia, MediaType } from '../../context/media-context';
import RenderWithScrollShadow from './scroll-shadow-render';
import MediaListCard from './media-list-item';
import { Link, Skeleton } from '@heroui/react';
import { usePosterDimensions } from '../../hooks/usePosterDimensions';
import { useSelector } from 'react-redux';
import { configSelector } from '../../store/selectors';

export default function MediaList(props: { list: Array<CompactMedia>, mediaType?: MediaType, title?: string, isRounded?: boolean, showAll?: boolean }) {
    const config = useSelector(configSelector);
    const title: string = props.title ? props.title : (props.mediaType === MediaType.PERSON ? 'Known for' : 'Top Cast');
    const { height, width } = usePosterDimensions();

    return (
        !!props.list.length && props.mediaType ?
            <section className='w-full flex flex-col'>
                {/* <h1 className={'font-bold my-1 '+ (config.theme.current === 'light' ? 'text-primary' : 'text-secondary')}>{ mediaType === MediaType.PERSON ? 'All filmography' : 'Known for' }</h1> */}
                <div className='flex justify-between'>
                    <h1 className='font-bold my-1 '>{title}</h1>
                    {
                        props.list.length >= 10 && props.showAll &&
                        <Link className='text-xs cursor-pointer hover:underline'>See All</Link>
                    }
                </div>
                <RenderWithScrollShadow className='flex space-x-3 bg-transparent scroll-items md:space-x-4'>
                    {
                        props.list.slice(0, 60).map((media: CompactMedia, index: number) => (
                            <MediaListCard key={title + '_' + media.id + '-' + index} media={media} className={''} isRounded={props.isRounded !== undefined && props.isRounded !== null ? props.isRounded : props.mediaType !== MediaType.PERSON} />
                        ))
                    }
                </RenderWithScrollShadow>
            </section> :
            !props.mediaType ?
                <RenderWithScrollShadow className='flex space-x-3'>
                    {
                        [1, 2, 3, 4].map((index: number) => (
                            <div key={'media-list-skeleton-'+index} className="space-y-2" style={{ width }}>
                                <Skeleton className={config.mediaType === MediaType.PERSON ? 'rounded-lg' : "rounded-full"}>
                                    <div className="rounded-full bg-secondary" style={{ height: (config.mediaType == MediaType.PERSON ? height : width), width }} />
                                </Skeleton>
                                <div className="space-y-1 flex flex-col items-center">
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-2 w-full rounded-lg bg-secondary" />
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-2 w-full rounded-lg bg-secondary-300" />
                                    </Skeleton>
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-2 w-full rounded-lg bg-secondary-200" />
                                    </Skeleton>
                                </div>
                            </div>
                        ))
                    }
                </RenderWithScrollShadow>
            : <></>
    );
}