import { useSelector } from 'react-redux';
import { configSelector, mediaSelector } from '../store/selectors';
import { useEffect, useState } from 'react';
import { ScrollShadow } from '@heroui/react';
import useTimer from '../hooks/useTimer';
import { getBackgroundImages, getIsColor } from '../utils/utils';
import { useLocation } from 'react-router';


export default function BackgroundImage() {
    const media = useSelector(mediaSelector);
    const config = useSelector(configSelector);
    const location = useLocation();

    const [classes, setClasses] = useState<{ base: string, wrapper: string, content: string }>({ base: '', wrapper: '', content: '' });
    const [background, setBackground] = useState<string | undefined>('');
    const [backgrounds, setBackgrounds] = useState<Array<string>>([]);

    const { timer, setTimer, setRunner } = useTimer(20);
    
    useEffect(() => {
        if (!getIsColor(config.background, location.pathname)) setBackgrounds(getBackgroundImages(config?.background, media.details?.images));
        else setBackgrounds([]);
        setTimer(0);
        setRunner(0);
    }, [media.details?.images.backdrops, config.background, location.pathname]);

    useEffect(() => {
        // console.log('changed', config.background, location.pathname, getIsColor(config.background, location.pathname));
        if (!getIsColor(config.background, location.pathname)) {
            const index: number = timer % backgrounds.length;
            setBackground(`url('${backgrounds[index]}') center top / cover`);
        }
        else {
            // console.log('ELSE BACKGROUND', config.backgroundColor);
            setBackground(config.backgroundColor);
        }
    }, [timer, backgrounds, location.pathname, config.backgroundColor])

    useEffect(() => {
        // console.log('second', config.background, location.pathname, getIsColor(config.background, location.pathname));
        const isColor = getIsColor(config.background, location.pathname);
        let wrapper: string = 'h-[100svh] sm:h-[80svh]';
        let content: string = 'absolute bottom-0 left-0 w-full h-64 z-10 pointer-events-none bg-gradient-to-t from-background to-transparent sm:flex';
        let base: string = '';
        
        if (isColor) {
            setBackground(config.background);
            wrapper = 'h-[100svh] fixed';
            content = '';
        }

        setClasses({ base, wrapper, content });
    }, [config.background, location.pathname]);
    

    return (
        <ScrollShadow hideScrollBar className={'transition ease-in-out duration-300 absolute inset-0 z-[-1] w-full left-0 top-0 ' + classes.wrapper}>
            <div style={{ background }} className='transition ease-in-out duration-300 w-full h-full bg-center bg-cover'>
                <div className={classes.content}/>
            </div>
        </ScrollShadow>
    );
}