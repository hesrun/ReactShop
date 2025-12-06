import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TitleSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#DDF2FF" highlightColor="white">
            <div className="mb-8">
                <Skeleton
                    width="60%"
                    height={32}
                    style={{ borderRadius: '4px' }}
                />
            </div>
        </SkeletonTheme>
    );
};

export default TitleSkeleton;
