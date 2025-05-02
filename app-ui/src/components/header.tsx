import { Autocomplete, AutocompleteItem, CircularProgress, Navbar, NavbarBrand, NavbarContent, NavbarItem, Image } from "@heroui/react";
import { CompactMedia, MediaReducer } from "../context/media-context";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { searchQuery } from "../store/reducers/media-reducer";
import { useAppDispatch, mediaSelector } from "../store/selectors";
import { navigateToDetails } from "../utils/utils";

function AutoCompleteSearch() {
    const dispatch = useAppDispatch();
    const media: MediaReducer = useSelector(mediaSelector);
    const navigate = useNavigate();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null); 

    const onValueChange = (event: any) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        const query: string = event.target.value ? event.target.value : '';

        debounceRef.current = setTimeout(() => dispatch(searchQuery(query)), 500);   
    }

    const onSelect = (selected: CompactMedia) => {
        inputRef.current?.blur();
        navigateToDetails(selected, navigate, dispatch);
    }
    
    return (
        <Autocomplete
            aria-label='Search'
            defaultItems={[]}
            variant='bordered'
            items={media.search.list}
            placeholder='Search for movie, tv, more...'
            radius='sm'
            inputProps={{ classNames: { input: 'text-xs font-bold text-foreground placeholder:text-foreground/50', inputWrapper: 'border-foreground/40 hover:!border-foreground' } }}
            onInput={onValueChange}
            classNames={{ popoverContent: 'rounded-md text-xs popover-app border-foreground ml-[-4px] lg:ml-0 ' + (!!media.search.list.length && 'p-0'), listboxWrapper: '[&>div]' }}
            ref={inputRef}
        >
            {
                (item: CompactMedia) => (
                    <AutocompleteItem textValue={item.name} className='auto-complete-item rounded-[5px]' key={item.id} onPress={() => onSelect(item)}>
                        <div className='flex space-x-2 sm:space-x-4'>
                            <div className='w-[60px]'>
                                <Image src={item.thumbnail} radius='sm' alt={item.name} className='w-[56px] h-[84px] sm:w-[60px] sm:h-[90px]' />
                            </div>
                            <div className='flex flex-col justify-center space-y-2 text-xs flex-1'>
                                <h1 className='font-bold text-xs'>{item.name}</h1>
                                {
                                    item.subtext.map((text: string, index) => (
                                        <p key={item.id + '-subtext-' + index}>{text}</p>
                                    ))
                                }
                            </div>
                            {
                                !!item.rating &&
                                <CircularProgress
                                    classNames={{
                                        svg: "w-12 h-12 drop-shadow-md",
                                        value: "text-xxs font-semibold",
                                    }}
                                    value={item.rating}
                                    strokeWidth={4}
                                    aria-label="Rating"
                                    color={item.rating >= 60 ? 'success' : item.rating >= 35 ? 'warning' : 'danger'}
                                    showValueLabel={true}
                                />
                            }
                        </div>
                    </AutocompleteItem>
                )
            }
        </Autocomplete>
    );
}


export default function Header() {
    return (
        <Navbar classNames={{ wrapper: 'px-2 gap-2 lg-p-0', base: 'bg-background/10 backdrop-blur-md' }}>
            <NavbarBrand className='hidden flex-grow-0'>
                <p className='font-bold text-inherit'>🎬 MDB</p>
            </NavbarBrand>
            <NavbarContent className='flex-1' justify='center'>
                <AutoCompleteSearch />
            </NavbarContent>
            <NavbarContent justify='end' className='hidden !flex-grow-0'>
                <NavbarItem>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}