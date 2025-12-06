import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CatalogSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#DDF2FF" highlightColor="white">
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6">
                {new Array(8).fill(0).map((_, index) => (
                    <div key={index} className="border border-black/5">
                        <div className="p-4">
                            <Skeleton className="aspect-[1/0.7]" />
                        </div>
                        <div className="p-4 pt-0">
                            <Skeleton />
                            <Skeleton width={`50%`} />
                        </div>
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
};

export default CatalogSkeleton;
