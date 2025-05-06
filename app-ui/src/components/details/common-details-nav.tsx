import { useNavigate } from 'react-router';
import { Movie, Person, TvShow, Media } from '../../context/media-context';
import { Divider, Image, Skeleton } from '@heroui/react';

export default function CommonDetailsNav({ className, details, title, hideDivider }: { className?: string, details?: Movie | Person | TvShow | Media, title: string, hideDivider?: boolean }) {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        if (details)
            navigate(`/${details.mediaType}/${details.id}`);
    }

    return (
        <div>
            <div className={'flex gap-x-4 mb-2 ' + (className ? className : '')}>
                {
                    !!details && !!details.poster && 
                    <Image onClick={navigateToDetails} radius='none' className='rounded-[5px] min-w-[48px] max-w-[48px] cursor-pointer' src={details.poster} />
                }
                {
                    !details &&
                    <Skeleton className='rounded-lg h-[70px] w-[46.667px]' >
                        <div className='h-24 rounded-lg bg-secondary' />
                    </Skeleton>
                }
                <div className='flex flex-col gap-2 min-w-[200px] md:min-w-[300px]'>
                    {
                        !!details ?
                            <>
                                <h1 className='font-bold hover:underline cursor-pointer text-sm md:text-md' onClick={navigateToDetails}>{details.name}</h1>
                                <p className='text-xs'>{title}</p>
                            </> :
                            <>
                                <Skeleton className='h-3 w-5/5 rounded-lg' />
                                <Skeleton className='h-3 w-4/5 rounded-lg' />
                            </>

                    }
                </div>
            </div>
            { !hideDivider && <Divider /> }
        </div>
    );
}