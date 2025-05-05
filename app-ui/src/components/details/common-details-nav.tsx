import { useNavigate } from 'react-router';
import { Movie, Person, TvShow, Media } from '../../context/media-context';
import { Image, Skeleton } from '@heroui/react';

export default function CommonDetailsNav({ className, details, title }: { className?: string, details?: Movie | Person | TvShow | Media, title: string }) {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        if (details)
            navigate(`/${details.mediaType}/${details.id}`);
    }

    return (
        <div className={'flex gap-x-4 mx-3 mb-3 ' + (className ? className : '')}>
            {
                !!details && !!details.poster && !details.poster?.includes('not_found') &&
                <Image onClick={navigateToDetails} height={70} radius='none' className='rounded-[5px] cursor-pointer' src={details.poster} />
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
    );
}