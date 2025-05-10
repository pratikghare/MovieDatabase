import { Outlet, useLocation } from 'react-router';
import Header from './components/header';
import BackgroundImage from './components/background-image';
import { useSelector } from 'react-redux';
import { configSelector } from './store/selectors';
import { useEffect } from 'react';
import { useTheme } from '@heroui/use-theme';
import Footer from './components/footer';

export default function App() {
    const config = useSelector(configSelector);
    const location = useLocation();
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(config.theme.theme);
    }, [config.theme])

    return (
        <section className='px-0 flex flex-col items-center cursor-default bg-black/10 min-h-svh'>
            <BackgroundImage />
            {
                !location.pathname.includes('credits') &&
                <Header />
            }
            <div className='max-w-[1024px] w-full flex-1 h-full'>
                <Outlet />
            </div>
            <Footer />
        </section>
    );
}