import type { Product } from '../../types/Types';
import { discountPriceCalc } from '../../utlis/price';
import { Link } from 'react-router';

const ProductCard = ({ data }: { data: Product }) => {
    return (
        <Link
            to={`/${data.category}/${data.id}`}
            className="border border-black/10 rounded-2xl overflow-hidden hover:border-sky-600 hover:shadow-xl transition-all"
        >
            <div className="bg-gray-50 relative">
                <img
                    className="mx-auto max-w-full"
                    src={data.thumbnail}
                    alt={data.title}
                    width="300px"
                    height="300px"
                />
                <div className="absolute top-0 right-0 bg-sky-600 text-white uppercase leading-[1rem] p-2 rounded-bl-2xl text-center text-xs font-semibold">
                    {Math.round(data.discountPercentage)} % <br />
                    OFF
                </div>
            </div>
            <div className="px-4 py-2">
                <h2 className="font-semibold text-lg">{data.title}</h2>
                <div className="flex items-baseline gap-4">
                    <b className="font-bold text-sky-600">
                        {discountPriceCalc(data.price, data.discountPercentage)}
                        $
                    </b>
                    <div className="text-sm text-red-800 line-through">
                        {data.price} $
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
