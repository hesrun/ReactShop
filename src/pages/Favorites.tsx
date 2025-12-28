import { useEffect } from 'react';
import Title from '../components/ui/Title';
import { observer } from 'mobx-react-lite';
import { favoriteStore } from '../store/favoriteStore';
import ProductCard from '../components/common/category/ProductCard';
import Cap from '../components/ui/Cap';
import { LucideHeart } from 'lucide-react';
import CatalogSkeleton from '../components/skeletons/CatalogSkeleton';

const Favorites = observer(() => {
    const data = favoriteStore.favoriteProducts;
    useEffect(() => {
        favoriteStore.getFavoriteProducts();
    }, []);

    return (
        <div>
            <Title type="h1">Favorites</Title>
            {favoriteStore.loading && <CatalogSkeleton />}
            {data && data.length > 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6">
                    {data.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            )}
            {data && data.length === 0 && (
                <Cap
                    icon={<LucideHeart size={48} className="text-sky-500" />}
                    text="Favorites is empty"
                />
            )}
        </div>
    );
});

export default Favorites;
