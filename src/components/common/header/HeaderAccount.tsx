import { LogOut, LucideLogIn, LucideNotebookText, User } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router';
import { userStore } from '../../../store/userStore';
import { useState, useEffect } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

const HeaderAccount = observer(() => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    const ref = useClickAway<HTMLDivElement>(() => {
        setShowMenu(false);
    });

    const handleLogout = async () => {
        await userStore.logout();
        if (location.pathname.includes('account')) {
            navigate('/');
        }
    };

    useEffect(() => {
        setShowMenu(false);
    }, [location.pathname]);

    return (
        <>
            {!userStore.user && (
                <div className="flex lg:border lg:border-sky-500 rounded-lg overflow-hidden">
                    <Link
                        to="/signin"
                        className="hidden lg:inline px-2 py-1 hover:bg-sky-500 hover:text-white transition-colors"
                    >
                        <span className="font-bold text-sm">Sign In</span>
                    </Link>
                    <Link
                        to="/signup"
                        className="lg:px-2 lg:py-1 lg:bg-sky-500 lg:text-white lg:hover:bg-white hover:text-black lg:border-l lg:border-sky-500 transition-colors"
                    >
                        <LucideLogIn className="text-sky-500 inline-block lg:hidden" />
                        <span className="hidden lg:inline font-bold text-sm">
                            Sign Up
                        </span>
                    </Link>
                </div>
            )}
            {userStore.user && (
                <div ref={ref} className="relative group">
                    <button
                        onClick={() => setShowMenu((prev) => !prev)}
                        className="font-bold text-sky-500 text-sm cursor-pointer"
                    >
                        <User className="text-sky-500 inline-block lg:hidden" />
                        <span className="hidden lg:inline">
                            {userStore.user && userStore.user.email}
                        </span>
                    </button>
                    {showMenu && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
                            <div className="text-sm text-sky-500 font-bold px-4 py-2 border-b border-gray-100 lg:hidden">
                                {userStore.user && userStore.user.email}
                            </div>
                            <Link
                                to="account/orders"
                                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 border-b border-gray-100 cursor-pointer hover:bg-sky-50"
                            >
                                <LucideNotebookText
                                    size={18}
                                    className="text-sky-500"
                                />
                                Orders
                            </Link>
                            <Link
                                to="/account"
                                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 border-b border-gray-100 cursor-pointer hover:bg-sky-50"
                            >
                                <User size={18} className="text-sky-500" />
                                Account
                            </Link>
                            <button
                                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 cursor-pointer hover:bg-sky-50 w-full"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} className="text-red-500" />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
});

export default HeaderAccount;
