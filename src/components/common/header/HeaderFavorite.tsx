import { LucideHeart } from 'lucide-react';
import { Link } from 'react-router';
import { favoriteStore } from '../../../store/favoriteStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { userStore } from '../../../store/userStore';

const HeaderFavorite = observer(() => {
    const count = favoriteStore.favoritesCount;

    useEffect(() => {
        if (userStore.user) {
            favoriteStore.getFavorites();
        }
    }, [userStore.user]);

    if (!userStore.user) return null;

    return (
        <>
            {userStore.user && (
                <Link
                    to="/favorite"
                    className="text-rose-500 font-medium relative hover:text-rose-700"
                    title="Favorites"
                >
                    <LucideHeart />
                    {count > 0 && (
                        <span className="absolute left-3 -top-1 bg-black text-white text-[.625rem] px-[.25rem] min-w-4 leading-[1rem] rounded-2xl text-center">
                            {favoriteStore.favoritesCount}
                        </span>
                    )}
                </Link>
            )}
        </>
    );
});

export default HeaderFavorite;
