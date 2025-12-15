import { Link } from 'react-router';
import HeaderAccount from './HeaderAccount';
import HeaderCartBtn from './HeaderCartBtn.tsx';
import HeaderSearch from './HeaderSearch';
import { LucideSearch, LucideX } from 'lucide-react';
import { useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import HeaderFavorite from './HeaderFavorite.tsx';

const Header = () => {
    const isDesktop = useMediaQuery('(min-width: 64rem)');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const showSearch = isDesktop || isMobileSearchOpen;

    return (
        <header className="border-b border-b-black/10">
            <div className="container flex items-center py-4 gap-4 relative">
                <Link to="/" className="font-black text-sky-500">
                    ReactShop
                </Link>
                {showSearch && (
                    <HeaderSearch
                        onClose={() => setIsMobileSearchOpen(false)}
                    />
                )}
                <div className="ml-auto flex items-center gap-4">
                    <HeaderAccount />
                    <HeaderFavorite />
                    <HeaderCartBtn />
                    <button
                        type="button"
                        title="Open Search"
                        className="leading-none lg:hidden"
                        onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                    >
                        {isMobileSearchOpen ? (
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
