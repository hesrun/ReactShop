import { Search } from 'lucide-react';
const HeaderSearch = () => {
    return (
        <div className="bg-sky-50 rounded-full relative grow max-w-[500px] mx-auto h-12">
            <Search className="absolute left-4 text-sky-500 top-3" />
            <input
                className="h-full w-full pl-12 pr-4"
                type="text"
                name=""
                id=""
                placeholder="Seach..."
            />
        </div>
    );
};

export default HeaderSearch;
