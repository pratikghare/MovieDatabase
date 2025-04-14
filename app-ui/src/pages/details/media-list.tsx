import { CompactMedia, MediaType } from '../../context/media-context';
import RenderWithScrollShadow from './scroll-shadow-render';
import MediaListCard from './media-list-item';
import { Link } from '@heroui/react';

export default function MediaList(props: { list: Array<CompactMedia>, mediaType: MediaType, title?: string }) {
    const title: string = props.title ? props.title : (props.mediaType === MediaType.PERSON ? 'Known for' : 'Top Cast');

    return (
        !!props.list.length ?
        <section className='w-full flex flex-col'>
            {/* <h1 className={'font-bold my-1 '+ (config.theme.current === 'light' ? 'text-primary' : 'text-secondary')}>{ mediaType === MediaType.PERSON ? 'All filmography' : 'Known for' }</h1> */}
            <div className='flex justify-between'>
                <h1 className='font-bold my-1 '>{ title }</h1>
                <Link className='text-xs cursor-pointer'>See All</Link>
            </div>
            <RenderWithScrollShadow className='flex space-x-3 bg-transparent scroll-items md:space-x-4'>
                {
                    props.list.slice(0,60).map((media: CompactMedia, index: number) => (
                        <MediaListCard key={title + '_' + media.id + '-' + index} media={media} className={''} isRounded={props.mediaType !== MediaType.PERSON} />
                    ))
                }
            </RenderWithScrollShadow>
        </section>: <></>
    );
}