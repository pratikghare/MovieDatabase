import { Link, Skeleton } from '@heroui/react';
import { CompactMedia } from '../../context/media-context';
import HorizontalScroll from '../horizontal-scroll';
import MediaListItem from './media-list-item';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { useId } from 'react';

interface MediaListProps {
    list: Array<CompactMedia>;
    title?: string;
    seeAll?: Function;
    isRounded?: boolean;
    showSkeleton?: boolean;
    skeletonLength?: number
    classNames?: { skeletonBase?: string, base?: string }
    largeSize?: boolean;
    offset?: number;
}
export default function MediaList({ list, title, seeAll, isRounded, showSkeleton, classNames, skeletonLength = 4, largeSize, offset }: MediaListProps) {
    const { height, width } = usePosterDimensions(largeSize ? { breakpointHeights: [100, 130, 160] } : undefined);
    const id = useId();

    return (
        !!list?.length ?
            <section className={'w-full flex flex-col gap-2 ' + (classNames?.base ? classNames.base : '')}>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold text-sm md:text-md'>{title}</h1>
                    {seeAll && <Link className='text-xs cursor-pointer text-primary hover:underline' onPress={() => seeAll()}>{'See All'}</Link>}
                </div>
                <HorizontalScroll offset={offset} className='gap-4'>
                    {
                        list.slice(0, 40).map((media: CompactMedia, index: number) => (
                            <MediaListItem largeSize={largeSize} key={title + '_' + media.id + '-' + index} media={media} className={''} isRounded={isRounded} />
                        ))
                    }
                </HorizontalScroll>
            </section> :
            showSkeleton &&
            <div className='flex flex-col gap-2'>
                {
                    title &&
                    <div className='w-full overflow-hidden'>
                        <Skeleton className='h-3 w-1/5 rounded-lg' />
                    </div>
                }
                <HorizontalScroll offset={offset} className={'gap-4 ' + (classNames?.skeletonBase ? classNames.skeletonBase : '')}>
                    {
                        Array(skeletonLength > 8 ? 8 : skeletonLength).fill(1).map((_, index: number) => (
                            <div key={id+'media-list-skeleton-' + index} className='space-y-2' style={{ width }}>
                                <Skeleton className={!isRounded ? 'rounded-lg' : 'rounded-full'}>
                                    <div className='rounded-full bg-secondary' style={{ height: (!isRounded ? height : width), width }} />
                                </Skeleton>
                                <div className='space-y-1 flex flex-col items-center'>
                                    <Skeleton className='w-4/5 rounded-lg'>
                                        <div className='h-2 w-full rounded-lg bg-secondary' />
                                    </Skeleton>
                                    <Skeleton className='w-4/5 rounded-lg'>
                                        <div className='h-2 w-full rounded-lg bg-secondary-300' />
                                    </Skeleton>
                                    <Skeleton className='w-3/5 rounded-lg'>
                                        <div className='h-2 w-full rounded-lg bg-secondary-200' />
                                    </Skeleton>
                                </div>
                            </div>
                        ))
                    }
                </HorizontalScroll>
            </div>
    );

}