import { useClickAway, useDebounce } from '@uidotdev/usehooks';
import { LoaderCircle, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import type { SearchRes } from '../../../types/Types';
import { Link } from 'react-router';
import { discountPriceCalc } from '../../../utlis/price';

const HeaderSearch = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    const ref = useClickAway(() => {
        setIsOpen(false);
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
        <div className="relative max-w-[500px] grow mx-auto h-12" ref={ref}>
            <Search className="absolute left-4 text-sky-500 top-3" />
            {loading && (
                <LoaderCircle
                    size={24}
                    className="absolute right-3 top-3 animate-spin text-sky-500"
                />
            )}
            <input
                className="h-full w-full pl-12 pr-4 rounded-full bg-sky-50"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {isOpen && (
                <div className="absolute top-[calc(100%+15px)] w-full bg-sky-500/10 p-4 pr-2 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-[6px] z-10">
                    {data && data.products.length > 0 ? (
                        <div className="grid gap-2 max-h-80 overflow-auto scroll">
                            {data.products.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/${item.category}/${item.id}`}
                                    className="flex items-center gap-2 bg-white/80 rounded-md text-sm mr-2 hover:bg-white transition-colors"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setQuery('');
                                    }}
                                >
                                    <div className="w-12 overflow-hidden">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="grow">{item.title}</div>
                                    <div className="font-semibold pr-4">
                                        {discountPriceCalc(
                                            item.price,
                                            item.discountPercentage
                                        )}
                                        $
                                    </div>
                                </Link>
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
    );
};

export default HeaderSearch;
