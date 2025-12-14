import { Link } from 'react-router';
import type { Product } from '../../../types/Types';
import { discountPriceCalc } from '../../../utlis/price';

interface SearchItemProps {
    item: Product;
    onClose?: () => void;
}
const SearchItem = ({ item, onClose }: SearchItemProps) => {
    return (
        <Link
            key={item.id}
            to={`/${item.category}/${item.id}`}
            className="flex items-center gap-2 bg-white/80 rounded-md text-sm mr-2 hover:bg-white transition-colors"
            onClick={() => {
                onClose?.();
            }}
        >
            <div className="w-12 overflow-hidden">
                <img src={item.images[0]} alt={item.title} />
            </div>
            <div className="grow">{item.title}</div>
            <div className="font-semibold pr-4">
                {discountPriceCalc(item.price, item.discountPercentage)}$
            </div>
        </Link>
    );
};

export default SearchItem;
