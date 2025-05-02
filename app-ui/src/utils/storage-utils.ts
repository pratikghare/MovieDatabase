import { NavigationKeyType, NavigationTabKeys } from '../context/common';

const USER_KEY = 'key';
const CURRENT_TAB = 'tab';

export const setUserStorage = (value: string, locally: boolean = false): void => {
    sessionStorage.setItem(USER_KEY, value);
    locally && localStorage.setItem(USER_KEY, value);
}
export const getUserStorage = (): string | null => sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
export const removeUserStorage = (): void => {
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
}


export const setCurrentTabStorage = (tab: NavigationKeyType) => sessionStorage.setItem(CURRENT_TAB, tab);
export const getCurrentTabStorage = (): NavigationKeyType => {
    const tab: any = sessionStorage.getItem(CURRENT_TAB);
    return tab ? tab : NavigationTabKeys.home;
}