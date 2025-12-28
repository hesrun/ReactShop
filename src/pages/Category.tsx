import { useParams } from 'react-router';
import ProductCard from '../components/common/category/ProductCard';
import useFetch from '../hooks/useFetch';
import type { CategoryProducts } from '../types/Types';
import Title from '../components/ui/Title';
import NotFound from './NotFound';
import CatalogSkeleton from '../components/skeletons/CatalogSkeleton';
import TitleSkeleton from '../components/skeletons/TitleSkeleton';

const Category = () => {
    const { category } = useParams();

    const { data, error, loading } = useFetch<CategoryProducts>(
        `https://dummyjson.com/products/category/${category}`
    );

    if (loading) {
        return (
            <>
                <TitleSkeleton />
                <CatalogSkeleton />
            </>
        );
    }

    if (error) {
        return <NotFound />;
    }

    if (!category) {
        return <NotFound />;
    }

    if (!data || !data.products || data.products.length === 0) {
        return (
            <div>
                <NotFound />
            </div>
        );
    }
    return (
        <>
            {category && (
                <Title type="h1">
                    <span className="text-sky-500 capitalize">
                        {category.split('-').join(' ')}
                    </span>{' '}
                    products
                </Title>
            )}
            {data && data.products.length > 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6">
                    {data.products.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Category;
