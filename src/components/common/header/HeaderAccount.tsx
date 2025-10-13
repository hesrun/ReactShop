import { LogIn, LogOut, User } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router';
import { userStore } from '../../../store/userStore';

const HeaderAccount = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await userStore.logout();
        if (location.pathname.includes('account')) {
            navigate('/');
        }
    };

    return (
        <>
            {userStore.user && (
                <div className="relative group">
                    <span className="text-black/70 font-bold text-sky-500 text-sm cursor-default">
                        {userStore.user && userStore.user.email}
                    </span>
                    <div className="absolute top-full min-w-full pt-2">
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
                            <Link
                                to="/account"
                                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 border-b border-gray-100 cursor-pointer hover:bg-sky-50"
                            >
                                <User size={18} className="text-sky-500" />
                                Account
                            </Link>
                            <a
                                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 cursor-pointer cursor-pointer hover:bg-sky-50"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} className="text-red-500" />
                                Log Out
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {!userStore.user && (
                <Link
                    to="/signin"
                    className="flex items-center text-black/70 font-bold gap-1 hover:text-sky-500"
                >
                    <LogIn className="text-sky-500" />
                    <span className="hidden lg:inline">Sign Up/Sign In</span>
                </Link>
            )}
        </>
    );
});

export default HeaderAccount;
