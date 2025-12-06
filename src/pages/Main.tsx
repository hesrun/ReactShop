import ProductCard from '../components/common/category/ProductCard';
import CatalogSkeleton from '../components/skeletons/CatalogSkeleton';
import TitleSkeleton from '../components/skeletons/TitleSkeleton';
import Title from '../components/ui/Title';
import useFetch from '../hooks/useFetch';
import type { CategoryProducts } from '../types/Types';

const Main = () => {
    const { data: tablets, loading: loadingTablets } =
        useFetch<CategoryProducts>(
            `https://dummyjson.com/products/category/tablets`
        );
    const { data: mobileAccessories, loading: loadingMobileAccessories } =
        useFetch<CategoryProducts>(
            `https://dummyjson.com/products/category/mobile-accessories`
        );

    if (loadingTablets || loadingMobileAccessories) {
        return (
            <div>
                <TitleSkeleton />
                <CatalogSkeleton />
                <TitleSkeleton />
                <CatalogSkeleton />
            </div>
        );
    }

    return (
        <div>
            <Title type="h2">
                Grab the best deal on{' '}
                <span className="text-sky-500">Tablets</span>
            </Title>
            {tablets && tablets.products.length > 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6 mb-8 xl:mb-12">
                    {tablets.products.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            )}
            <Title type="h2">
                Grab the best deal on{' '}
                <span className="text-sky-500">Mobile Accessories</span>
            </Title>
            {mobileAccessories && mobileAccessories.products.length > 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6">
                    {mobileAccessories.products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Main;
