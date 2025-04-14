import { Tabs, Tab, Avatar } from '@heroui/react';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { NavigationTabKeys } from '../context/common';
import { useSelector } from 'react-redux';
import { configSelector, useAppDispatch } from '../store/selectors';
import { updateCurrentTab } from '../store/reducers/config-reducer';

export default function NavigationTabs() {
    const config = useSelector(configSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log()
    }, []);

    const changeTab = (key: any) => {
        dispatch(updateCurrentTab(key));
    }
    return(
        <div className='fixed flex w-full bottom-1 justify-center'>
            <Tabs className='backdrop-blur-md rounded-2xl' classNames={{ tabList: 'h-12 px-0.5', tab: 'h-10' }}
                aria-label='Tabs radius' size='lg' variant='bordered' color='primary' radius='sm'
                onSelectionChange={changeTab} selectedKey={config.tab}>
                {
                    Object.keys(NavigationTabKeys).map((key) => (
                        <Tab key={key} shouldSelectOnPressUp title={ <NavigationTitle keyId={key} /> } />
                    ))
                }
            </Tabs>
        </div>
    );
}

function NavigationTitle({ keyId }: { keyId: string }) {
    const iconsClass = 'size-8';
    // const loggedInUser = useSelector(currentUserSelector);

    return (
        <div className='flex items-center space-x-2'>
            {
                keyId === NavigationTabKeys.home ? <HomeIcon className={iconsClass} /> :
                    keyId === NavigationTabKeys.search ? <MagnifyingGlassIcon className={iconsClass} /> :
                        keyId === NavigationTabKeys.account ? <>
                            <Avatar className={iconsClass}
                                // src={`${loggedInUser?.image ? loggedInUser.image : NO_IMAGE}`}
                                // name={loggedInUser?.initials ? loggedInUser.initials : undefined}
                                showFallback
                            />
                        </> : <></>
            }
            <span className='text-xs sm:block'>
                {
                    keyId === NavigationTabKeys.home ? 'Home' :
                        keyId === NavigationTabKeys.search ? 'Search' :
                            keyId === NavigationTabKeys.account ? 'Account' : ''
                }
            </span>
        </div>
    );
}