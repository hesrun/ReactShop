import { useParams } from 'react-router';
import ProductCard from '../components/common/ProductCard';
import useFetch from '../hooks/useFetch';
import type { CategoryProducts } from '../types/Types';
import Title from '../components/ui/Title';

const Category = () => {
    const { category } = useParams();
    const { data, error, loading } = useFetch<CategoryProducts>(
        `https://dummyjson.com/products/category/${category}`
    );

    return (
        <div>
            {category && (
                <Title type="h1" className="mb-8">
                    <span className="text-sky-500 capitalize">
                        {category.split('-').join(' ')}
                    </span>{' '}
                    products
                </Title>
            )}

            {data && data.products.length && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6">
                    {data.products.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
