import { LucideHeartMinus, LucideHeartPlus } from 'lucide-react';
import type { Product } from '../../../types/Types';
import { discountPriceCalc } from '../../../utlis/price';
import { Link } from 'react-router';
import { favoriteStore } from '../../../store/favoriteStore';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../store/userStore';

const ProductCard = observer(({ data }: { data: Product }) => {
    const addToFavorites = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        e.preventDefault();
        favoriteStore.toggleFavorite(id);
    };
    return (
        <Link
            to={`/${data.category}/${data.id}`}
            className="border border-black/10 rounded-2xl overflow-hidden hover:border-sky-600 hover:shadow-xl transition-all"
        >
            <div className="bg-gray-50 relative">
                <img
                    className="mx-auto max-w-full"
                    src={data.thumbnail}
                    alt={data.title}
                    width="300px"
                    height="300px"
                />
                {userStore.user && (
                    <button
                        title={
                            favoriteStore.isFavorite(data.id)
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                        }
                        onClick={(e) => addToFavorites(e, data.id)}
                        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        {favoriteStore.isFavorite(data.id) ? (
                            <LucideHeartMinus className="text-rose-600" />
                        ) : (
                            <LucideHeartPlus className="text-sky-500" />
                        )}
                    </button>
                )}
                <div className="absolute top-0 right-0 bg-sky-600 text-white uppercase leading-[1rem] p-2 rounded-bl-2xl text-center text-xs font-semibold">
                    {Math.round(data.discountPercentage)} % <br />
                    OFF
                </div>
            </div>
            <div className="px-4 py-2">
                <h2 className="font-semibold text-lg">{data.title}</h2>
                <div className="flex items-baseline gap-4">
                    <b className="font-bold text-sky-600">
                        {discountPriceCalc(data.price, data.discountPercentage)}
                        $
                    </b>
                    <div className="text-sm text-red-800 line-through">
                        {data.price} $
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default ProductCard;
