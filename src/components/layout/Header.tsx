import { Link } from 'react-router';
import HeaderAccount from '../common/header/HeaderAccount';
import HeaderCartBtn from '../common/header/HeaderCartBtn.tsx';
import HeaderSearch from '../common/header/HeaderSearch';

const Header = () => {
    return (
        <header className="border-b border-b-black/10 ">
            <div className="container flex items-center py-4">
                <Link to="/" className="font-black text-sky-500">
                    ReactShop
                </Link>
                <HeaderSearch />
                <div className="ml-auto flex items-center gap-4">
                    <HeaderAccount />
                    <HeaderCartBtn />
                </div>
            </div>
        </header>
    );
};

export default Header;
