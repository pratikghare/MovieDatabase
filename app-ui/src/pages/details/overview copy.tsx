import { Button, Chip, Image, ScrollShadow } from '@heroui/react';
import { Genre, Movie, Person, TvShow } from '../../context/media-context';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import RenderWithScrollShadow from './scroll-shadow-render';
import { GalleryIcon, VideoIcon } from '../../components/icons';
import { useSelector } from 'react-redux';
import { configSelector } from '../../store/selectors';

const PADDING = 12;
const SPACE = 16;
const OFFSET = PADDING + PADDING + SPACE + 120;

export default function Overview({ details }: { details: Movie | Person | TvShow }) {
    const config = useSelector(configSelector);

    return (
        <section className='flex flex-col space-y-3'>
            <div className='flex space-x-4 text-xs'>
                <Image src={details?.poster} className='min-w-[120px] w-full max-w-[200px] flex-1' radius='sm' />

                <div className='flex flex-col space-y-2'>
                    <h1 className='font-bold text-sm sm:text-xl md:text-2xl'>{details?.name}</h1>
                    {
                        ('tagline' in details!) && details?.tagline &&
                        <RenderWithScrollShadow offset={OFFSET}>
                            <p className='italic text-xs'>&ldquo;{details.tagline}&rdquo;</p>
                        </RenderWithScrollShadow>
                    }
                    {
                        !!details.subtext?.length &&
                        <RenderWithScrollShadow offset={OFFSET} className='flex space-x-2 items-center text-xs'>
                            {
                                details.subtext.map((text: string, index: number) => (
                                    <>
                                        <Chip key={'subtext-chip-' + index} variant='light' className='text-xs px-0' classNames={{ content: 'px-0' }}><span>{text}</span></Chip>
                                        {index < (details.subtext.length - 1) && <Chip variant='light' className='text-xs px-0' classNames={{ content: 'px-0' }}><PlusCircleIcon key={'subtext-sep-' + index} className='w-1 h-1' /></Chip>}
                                    </>
                                ))
                            }
                        </RenderWithScrollShadow>
                    }
                    {
                        ('birthday' in details!) && details.birthday &&
                        <p className='flex space-x-2 items-center text-xs'><span>Born</span> : <span>{details.birthday}</span></p>
                    }
                    {
                        !!details?.genres &&
                        <RenderWithScrollShadow offset={OFFSET} className='flex space-x-2'>
                            {
                                details.genres.map((genre: Genre) => (
                                    <Button key={'genre-chip-' + genre.id} radius='sm' variant={config.theme.current === 'light' ? 'bordered' : 'flat'} 
                                        className={'transition-ease h-6 text-xs cursor-pointer hover:bg-opacity-50 ' + (config.theme.current === 'light' ? 'border-1 border-foreground' : '')}
                                    >
                                        {genre.name}
                                    </Button>
                                ))
                            }
                        </RenderWithScrollShadow>
                    }
                    {
                        !!details.images.length || (('videos' in details!) && !!details.videos?.length) ?
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    !!details.images.length &&
                                    <Button variant={config.theme.current === 'light' ? 'bordered' : 'flat'} radius='sm' className={'text-xs px-2 sm:px-4 h-8 sm:h-10 hover:bg-opacity-50 ' + (config.theme.current === 'light' ? 'border-1 border-foreground' : '')}>
                                        <GalleryIcon className='size-4 sm:size-6' />
                                        <span>{details.images.length} Photo{details.images.length > 1 ? 's' : ''}</span>
                                    </Button>
                                }
                                {
                                    ('videos' in details!) && !!details.videos.length &&
                                    <Button variant={config.theme.current === 'light' ? 'bordered' : 'flat'} radius='sm' className={'text-xs px-2 sm:px-4 h-8 sm:h-10 hover:bg-opacity-50 ' + (config.theme.current === 'light' ? 'border-1 border-foreground' : '')}>
                                        <VideoIcon className='size-4 sm:size-6' />
                                        <span>{details.videos.length} Video{details.videos.length > 1 ? 's' : ''} </span>
                                    </Button>
                                }
                            </div> : <></>
                    }
                </div>
            </div>
            {
                details.overview &&
                <ScrollShadow hideScrollBar className='max-h-[200px] flex flex-col space-y-1'>
                    {
                        details.overview.split('\n').map((para: string, index: number) => (
                            !!para.length &&
                            <p className='text-xs' key={'overview-para-' + index}>{para}</p>
                        ))
                    }
                </ScrollShadow>
            }
        </section>
    )
}
