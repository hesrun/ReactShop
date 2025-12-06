import { NavLink } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import type { Category } from '../../../types/Types';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CategoriesNav = () => {
    const { data, loading } = useFetch<Category[]>(
        'https://dummyjson.com/products/categories'
    );

    if (loading) {
        return (
            <div className="py-4 mb-8">
                <SkeletonTheme baseColor="#DDF2FF" highlightColor="white">
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                        {new Array(20).fill(0).map((_, index) => (
                            <Skeleton
                                key={index}
                                width="100px"
                                height={28}
                                style={{ borderRadius: '20px' }}
                            />
                        ))}
                    </div>
                </SkeletonTheme>
            </div>
        );
    }

    return (
        <div className="py-4 mb-8">
            {data && data.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {data.map((category) => (
                        <NavLink
                            to={category.slug}
                            key={category.slug}
                            className={({ isActive, isPending }) =>
                                clsx(
                                    'bg-sky-100 rounded-2xl px-4 py-1 text-sm font-medium text-black/80 transition-colors hover:bg-sky-500 hover:text-white',
                                    isPending && 'opacity-50',
                                    isActive && 'bg-sky-500 text-white'
                                )
                            }
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesNav;
