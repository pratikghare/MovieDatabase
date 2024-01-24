import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { getRelevanceSearchBarResults, multiSearchQuery } from '../../services/ServicesExport';
import { ColorRing } from 'react-loader-spinner';
import SearchOptionItem from './SearchOptionItem';
import { useNavigate } from 'react-router-dom';

const arr: Array<any> = [];
const obj: any = {};

export default function SearchBar() {
  const [selected, setSelected] = useState(obj);
  const [query, setQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [relevanceList, setRelevanceList] = useState(arr);

  const navigate = useNavigate();

  const onInputChange = (event: any) => {
    const term = event.target.value;
    setLoader(term.length > 2);
    setQuery(term);
    if(term.length > 2){
      multiSearchQuery(term).then((result: any) => {
        setList(result.results);
        setLoader(false);
        setRelevanceList(getRelevanceSearchBarResults(result.results));
      })
    }
    else setList([]);
  }

  const onSelectionChange = (value: any) => {
    if(value === 'all-result') navigate('/search-results/'+query, { state: {relevanceList:  relevanceList} });
    else navigate(`/${value.media_type}/`+value.id, { state: {relevanceList:  relevanceList} });
    setSelected(value);
  }

  return (
    <div className="search-bar">
      <Combobox value={selected} onChange={onSelectionChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-gray-700 text-left shadow-md focus:outline-none">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-gray-700 text-gray-400 outline-none focus:ring-0"
              displayValue={(item: any) => item.name}
              onChange={(event) => onInputChange(event)}
              placeholder='Search for movies, actors, more...'
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {
                loader ? 
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#ED7B7B', '#ED7B7B', '#ED7B7B', '#ED7B7B', '#ED7B7B']}
                /> :
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-80 w-full overflow-auto rounded-md bg-gray-700 bg-opacity-90 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list.length === 0 || query === '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-200">
                  No results found.
                </div>
              ) : (
                <>
                  <Combobox.Option //onClick={() => {onSelectionChange('all-results')}}
                    key={'all-result'}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-2 ${
                        active ? 'bg-app text-white' : 'text-gray-200'
                      }`
                    }
                    value={'all-result'}
                  >
                    Show all results for "{query}"
                  </Combobox.Option>
                  {
                    list.map((item: any) => (
                      <Combobox.Option //onClick={() => {onSelectionChange(item)}}
                        key={item.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-2 ${
                            active ? 'bg-app text-white' : 'text-gray-200'
                          }`
                        }
                        value={item}
                      >
                        <SearchOptionItem item={item}></SearchOptionItem>
                      </Combobox.Option>
                    ))
                  }
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
