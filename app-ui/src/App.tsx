import { Outlet, useLocation } from 'react-router';
import Header from './components/header';
import { useEffect } from 'react';
import { useTheme } from "@heroui/use-theme";
import { useSelector } from 'react-redux';
import { configSelector } from './store/selectors';
import Footer from './components/footer';

export default function App() {
    const location = useLocation();
    const config = useSelector(configSelector);
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(config.theme.current);
    }, [config.theme])

    useEffect(() => {
        // console.log(location.pathname);
    }, [location.pathname])

    return (
        <section className='px-0 flex flex-col items-center cursor-default bg-black/10 min-h-svh'>
            <Header></Header>
            <div className='max-w-[1024px] w-full flex-1 h-full'>
                <Outlet />
            </div>
            <Footer />
            {/* <NavigationTabs /> */}
        </section>
    );
}