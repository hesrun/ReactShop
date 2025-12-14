import { useClickAway, useDebounce } from '@uidotdev/usehooks';
import { LoaderCircle, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import type { SearchRes } from '../../../types/Types';
import SearchItem from './SearchItem';

const HeaderSearch = ({ onClose }: { onClose: () => void }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    const ref = useClickAway<HTMLDivElement>(() => {
        setIsOpen(false);
        setQuery('');
    });

    const shouldFetch = debouncedQuery.trim().length > 0;

    const { data, loading } = useFetch<SearchRes>(
        shouldFetch
            ? `https://dummyjson.com/products/search?q=${debouncedQuery}`
            : ''
    );

    useEffect(() => {
        setIsOpen(debouncedQuery.length > 0);
    }, [debouncedQuery]);

    return (
        <div
            ref={ref}
            className="absolute z-10 px-4 left-0 top-0 h-full right-12 bg-white lg:static lg:max-w-[500px] grow mx-auto"
        >
            <div className="relative h-12 mt-1">
                <Search className="hidden lg:block absolute left-4 text-sky-500 top-3" />
                {loading && (
                    <LoaderCircle
                        size={24}
                        className="absolute right-3 top-3 animate-spin text-sky-500"
                    />
                )}
                <input
                    className="h-full w-full lg:pl-12 pr-4 lg:rounded-full lg:bg-sky-50 "
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {isOpen && (
                    <div className="absolute top-[calc(100%+15px)] w-full bg-sky-500/10 p-4 pr-2 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-[6px] z-10">
                        {data && data.products.length > 0 ? (
                            <div className="grid gap-2 max-h-80 overflow-auto scroll">
                                {data.products.map((item) => (
                                    <SearchItem
                                        item={item}
                                        onClose={() => {
                                            onClose();
                                            setIsOpen(false);
                                            setQuery('');
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            !loading && (
                                <div className="text-center font-medium">
                                    No results found
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderSearch;
