import { GitHubIcon } from './icons';

export default function Footer() {
    return (
        <section className='bg-foreground-100 min-h-[80px] sm:min-h-[100px] w-full text-xxs sm:!text-xs flex justify-between items-center px-3 sm:px-5 font-bold'>
            <p className='flex-1'>&copy; {new Date().getFullYear()} MDB by Pratik Ghare. All rights reserved.</p>
            <div className='flex-1 flex justify-end'>
                <a href='http://github.com/pratikghare/' target='_blank'><GitHubIcon className='cursor-pointer' /></a>
            </div>
        </section>
    );
}