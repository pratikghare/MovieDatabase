import { Image } from '@heroui/react';
import { GitHubIcon } from './icons';

export default function Footer() {
    return (
        <section className='bg-foreground-100 border-t-1 border-foreground/10 min-h-[80px] sm:min-h-[100px] w-full text-xxs sm:!text-xs flex justify-between items-center px-3 sm:px-5 '>
            <div className='flex-1'>
                <p className='font-bold'>&copy; {new Date().getFullYear()} MDB by Pratik Ghare.<br className='sm:hidden'/> All rights reserved.</p>
                <div className='flex text-xxs items-center gap-2 mt-1'>
                    <p>Powered by</p>
                    <Image src='/tmdb.svg' radius='none' height={10} />
                </div>
            </div>
            <div className='flex-1 flex justify-end'>
                <a href='http://github.com/pratikghare/' target='_blank'><GitHubIcon className='cursor-pointer' /></a>
            </div>
        </section>
    );
}