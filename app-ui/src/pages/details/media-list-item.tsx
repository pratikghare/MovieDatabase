import { Card, CardFooter, Image } from '@heroui/react';
import { getShortString } from '../../utils/utils';
import { CompactMedia } from '../../context/media-context';
import { useNavigate } from 'react-router';
import { usePosterDimensions } from '../../hooks/usePosterDimensions';

interface MediaListCardProps{
    media: CompactMedia;
    className?: string;
    isRounded?: boolean;

}

export default function MediaListCard({ media, className, isRounded }: MediaListCardProps) {
    const navigate = useNavigate();
    const { height, width } = usePosterDimensions();
    const classes = 'decoration-white/80 text-white/80 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 bottom-1 absolute before:rounded-xl rounded-md w-[calc(100%_-_6px)] ml-[3px] shadow-small z-10';

    const characters: Array<string> = media.character ? media.character.split(', ') : [];

    const onClick = (media: CompactMedia) => {
        navigate(`/${media.mediaType}/${media.id}`);
    }

    return (
        <Card isFooterBlurred className={'border-none overflow-visible bg-transparent shadow-none ' + className} radius={isRounded ? 'none' : 'lg'} style={{ minWidth: width, minHeight: isRounded ? width : height }}>
            <Image
                alt={media.name}
                className='object-cover w-fit shadow-sm border-1 border-background/10'
                src={media.thumbnail}
                style={{ width, height: isRounded ? width : height }}
                radius={ isRounded ? 'full' : 'sm' }
            />
            <CardFooter onClick={() => onClick(media)} className={'items-center cursor-pointer hover:underline justify-center min-h-5 flex-col ' + (height > 120 && !isRounded ? classes : 'bg-transparent backdrop-blur-none backdrop-filter-none p-1')} style={{ maxWidth: width }}>
                <p className='text-xxs text-center p-0 font-bold '>{getShortString(media.name)}</p>

                {
                    !!characters.length &&
                    <div className={'flex items-center text-xs bottom-0 overflow-auto scrollbar-hide '} style={{ maxWidth: (height > 120 && !isRounded) ? (width - 20) : width }}>
                        <p className='text-xxs sm:text-xs text-nowrap text-center px-0 min-w-1'>(</p>
                        {
                            characters.map((char: string, index: number) => (
                                <div className='flex items-center text-xxs sm:text-xs' key={char+index}>
                                    <p className='text-nowrap text-center px-0'>{char}</p>
                                    {(index < characters?.length - 1) && <p  className='text-nowrap text-center px-0 min-w-1 mr-1'>, </p>}
                                </div>
                            ))
                        }
                        <p className='text-nowrap text-center px-0 min-w-1'>)</p>
                    </div>
                }
            </CardFooter>
        </Card>
    );
}