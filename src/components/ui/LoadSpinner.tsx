import { Loader2 } from 'lucide-react';

const LoadSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[30vh]">
            <Loader2
                size={48}
                className="animate-spin text-sky-500 duration-100"
            />
        </div>
    );
};

export default LoadSpinner;
