import { useNavigate } from 'react-router';
import { Movie, Person, TvShow, Media } from '../../context/media-context';
import { Image } from '@heroui/react';

export default function CommonDetailsNav({ className, details, title }: { className?: string, details: Movie | Person | TvShow | Media, title: string }) {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`/${details.mediaType}/${details.id}`);
    }
    
    return(
        <div className={'flex gap-x-4 mx-3 mb-3 ' + (className ? className : '')}>
            {
                !!details.poster && !details.poster?.includes('not_found') &&
                <Image onClick={navigateToDetails} height={70} radius='none' className='rounded-[5px] cursor-pointer' src={details.poster} />
            }
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold hover:underline cursor-pointe text-sm md:text-md' onClick={navigateToDetails}>{ details.name }</h1>
                <p className='text-xs'>{ title }</p>
            </div>
        </div>
    );
}