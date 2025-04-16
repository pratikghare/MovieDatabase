import data from "./env/keys.json";
import * as fs from "fs";
import { resolve } from "path";

export const isAtleastAMonthDiff = (old: number): boolean => {
    const oldDate = new Date(old);
    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - oldDate.getFullYear();
    const monthDiff = currentDate.getMonth() - oldDate.getMonth();

    const totalMonthDiff = yearDiff * 12 + monthDiff;

    return totalMonthDiff >= 1;
}


export const isAtleastADayDiff = (old: number): boolean => {
    const now = Date.now();
    const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const diffTime = Math.abs(now - old); 
    const diffDays = Math.floor(diffTime / MS_IN_A_DAY);

    return diffDays >= 1;
}


interface KeyTypeListItem {
    type: string;
    expiry: string;
    limit: number;
    keys: Array<ApiKeyItem>;
    excludes: Array<string>;
}

interface ApiKeyItem {
    email: string;
    userId?: string;
    key: string;
    count: number;
    date: any;
    createdDate?: any;
}

const keys: Array<KeyTypeListItem> = [...data];


const getKey = (count: number = 1, type: string, exclude?: string): string => {
    let key: string | null = null;

    keys.find((keyItem: KeyTypeListItem) => {
        const callback: Function = keyItem.expiry === "monthly" ? isAtleastAMonthDiff : isAtleastADayDiff;

        if(exclude && !keyItem.excludes?.find((exc: string) => exc === exclude)) keyItem.excludes.push(exclude);

        if(keyItem.type === type) {
            return keyItem.keys.find((item: ApiKeyItem) => {
                if(callback(item.date)) {
                    key = item.key;
                    item.count = 0;
                    item.date = Date.now();
                    return item;
                }
                else if(keyItem.excludes.find((exc: string) => exc === item.key)) return;
                else if((item.count + count) <= keyItem.limit || callback(item.date)) {
                    key = item.key;
                    item.count += count;
                    return item;
                }
            })
        }
    })

    const path = resolve(__dirname, "./env/keys.json");
    fs.writeFileSync(path, JSON.stringify(keys));

    return key ? key : "";
}

export const getTMKey = (count: number = 1, exclude?: string): string => getKey(count, "TMDB", exclude);
export const getOMKey = (count: number = 1, exclude?: string): string => getKey(count, "OMDB", exclude);
export const getIPInfoKey = (count: number = 1, exclude?: string): string => getKey(count, "IPINFO", exclude);