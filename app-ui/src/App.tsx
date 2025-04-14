import { Outlet, useLocation } from 'react-router';
import Header from './components/header';
import { useEffect } from 'react';
import { useTheme } from "@heroui/use-theme";
import { useSelector } from 'react-redux';
import { configSelector } from './store/selectors';

export default function App() {
    const location = useLocation();
    const config = useSelector(configSelector);
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(config.theme.current);
    }, [config.theme])

    useEffect(() => {
        console.log(location.pathname);
    }, [location.pathname])

    return (
        <section className='px-0 flex flex-col items-center justify-center cursor-default'>
            <Header></Header>
            <div className='max-w-[1024px] w-full px-3 mt-3 mb-[60px]'>
                <Outlet />
            </div>
            {/* <NavigationTabs /> */}
        </section>
    );
}