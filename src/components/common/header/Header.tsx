import { Link } from 'react-router';
import HeaderAccount from './HeaderAccount';
import HeaderCartBtn from './HeaderCartBtn.tsx';
import HeaderSearch from './HeaderSearch';
import { LucideSearch, LucideX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMediaQuery, useClickAway } from '@uidotdev/usehooks';

const Header = () => {
    const [showSearch, setShowSearch] = useState(true);
    const isLg = useMediaQuery('(min-width: 64rem)');

    useEffect(() => {
        setShowSearch(isLg ? true : false);
    }, [isLg]);

    const ref = useClickAway<HTMLDivElement>(() => {
        setShowSearch(false);
    });

    return (
        <header className="border-b border-b-black/10">
            <div
                ref={ref}
                className="container flex items-center py-4 gap-4 relative"
            >
                <Link to="/" className="font-black text-sky-500">
                    ReactShop
                </Link>
                {showSearch && <HeaderSearch />}
                <div className="ml-auto flex items-center gap-4">
                    <HeaderAccount />
                    <HeaderCartBtn />
                    <button
                        type="button"
                        title="Open Search"
                        className="leading-none lg:hidden"
                        onClick={() => setShowSearch((prev) => !prev)}
                    >
                        {showSearch ? (
                            <LucideX className="text-gray-600" />
                        ) : (
                            <LucideSearch className="text-sky-500" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
