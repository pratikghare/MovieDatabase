import { Link, Skeleton } from '@heroui/react';
import { CompactMedia } from '../../context/media-context';
import HorizontalScroll from '../horizontal-scroll';
import MediaListItem from './media-list-item';
import usePosterDimensions from '../../hooks/usePosterDimensions';

interface MediaListProps {
    list: Array<CompactMedia>;
    title?: string;
    seeAll?: Function;
    isRounded?: boolean;
    showSkeleton?: boolean;
}
export default function MediaList({ list, title = "", seeAll, isRounded, showSkeleton }: MediaListProps) {
    const { height, width } = usePosterDimensions();
    
    return (
        !!list?.length ?
            <section className='w-full flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold'>{title}</h1>
                    {seeAll && <Link className='text-xs cursor-pointer text-primary hover:underline' onPress={() => seeAll()}>{'See All'}</Link>}
                </div>
                <HorizontalScroll className='gap-4'>
                    {
                        list.slice(0, 40).map((media: CompactMedia, index: number) => (
                            <MediaListItem key={title + '_' + media.id + '-' + index} media={media} className={''} isRounded={isRounded} />
                        ))
                    }
                </HorizontalScroll>
            </section> :
            showSkeleton &&
            <HorizontalScroll className='gap-4'>
                {
                    [1, 2, 3, 4].map((index: number) => (
                        <div key={'media-list-skeleton-' + index} className="space-y-2" style={{ width }}>
                            <Skeleton className={!isRounded ? 'rounded-lg' : "rounded-full"}>
                                <div className="rounded-full bg-secondary" style={{ height: (!isRounded? height : width), width }} />
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
            </HorizontalScroll>
    );

}