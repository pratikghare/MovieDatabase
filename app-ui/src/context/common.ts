
export const NavigationTabKeys = {
    home: 'home',
    search: 'search',
    account: 'account'
} as const;

export type NavigationKeyType = (typeof NavigationTabKeys)[keyof typeof NavigationTabKeys];