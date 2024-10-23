import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import AppImage from "./Image";
import { MediaDetails } from "../../Model/Model";

export interface AutoCompleteProps {
    autoFocus?: boolean;
    onFocusChange?: Function;
    onInputChange?: Function;
    onSelectionChange?: Function;
    placeholder?: string;
    results?: Array<any>;
    imageWidth: number;
    ariaHidden?: boolean;
}

interface Genre {
    id: number;
    name: string;
}

export default function AppAutoComplete({ autoFocus, placeholder, onSelectionChange, imageWidth, onFocusChange, results, onInputChange }: AutoCompleteProps) {
    const width = imageWidth ? imageWidth : 50;
    return (
        <Autocomplete
            placeholder={placeholder ? placeholder : "Search for movies, actors, more..."}
            defaultItems={results ? results : []}
            aria-label="Close"
            autoFocus={autoFocus}
            allowsCustomValue
            onSelectionChange={(item) => {onSelectionChange ? onSelectionChange(item) : ""}}
            onFocusChange={(change: boolean) => { onFocusChange ? onFocusChange(change) : "" }}
            startContent={<MagnifyingGlassIcon className="h-5 w-5" />}
            onInput={() => onInputChange ? onInputChange(event) : ""}
            className="text-xs focus:border-primary-100 focus:ring-primary-200 focus:outline-primary-100"
            classNames={{ popoverContent:"popover-app" }}
        >
            {(item: MediaDetails) => (
                <AutocompleteItem key={item.id} textValue={item.name}>
                    <div className="flex items-start">
                        <div className="rounded mr-3">
                            <AppImage className="rounded" width={width} unit="px" url={item.thumbnail} />
                        </div>
                        <div className="search-content grid gap-1">
                            { item.name.length ? <span className="font-bold text-xs">{ item.name }</span> : <></> }
                            { item.year ? <span className="text-xs text-gray-400">{ item.year }</span> : <></> }
                            { item.genres.length ? <span className="text-xs text-gray-400">{ item.genres.map((genre: Genre) => genre.name).join(", ") }</span> : <></> }
                            { item.department ? <span className="text-xs text-gray-400">{ item.department }</span> : <></> }
                            { item.knownFor ? <span className="text-xs text-gray-400">{ item.knownFor }</span> : <></>}
                        </div>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}