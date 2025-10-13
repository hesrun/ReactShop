import { Link } from 'react-router';
import { Trash } from 'lucide-react';
import type { CartProduct } from '../../../types/Types';
import { discountPriceCalc } from '../../../utlis/price';
import { cartStore } from '../../../store/cartStore';

interface CartTableProps {
    data: CartProduct[];
    total: CartProduct['total'];
}

const CartTable = ({ data, total }: CartTableProps) => {
    return (
        <>
            <div className="hidden gap-2 md:grid grid-cols-[5fr_1fr_1fr_1fr_50px] border-b border-sky-500 text-sky-500 font-semibold pb-4">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
                <div></div>
            </div>
            {data.map((product) => (
                <div
                    key={product.id}
                    className="relative py-4 grid grid-cols-3 gap-2 border-b border-black/10 first:pt-0 md:grid-cols-[5fr_1fr_1fr_1fr_50px] md:items-center"
                >
                    <div className="flex items-center gap-4 col-span-3 md:col-span-1">
                        <div className="border border-black/10 w-10 lg:w-20">
                            <img
                                width="80px"
                                height="80px"
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        </div>
                        <div className="grid">
                            <Link
                                to={`/${product.category}/${product.id}`}
                                className="text-sky-500 font-semibold hover:text-sky-600"
                            >
                                {product.title}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="text-black/50 md:hidden">Price</div>
                        <div className="font-bold">
                            {discountPriceCalc(
                                product.price,
                                product.discountPercentage
                            )}{' '}
                            $
                        </div>
                    </div>
                    <div>
                        <div className="text-black/50 md:hidden">Quantity</div>
                        <div className="font-bold">{product.quantity}</div>
                    </div>
                    <div>
                        <div className="text-black/50 md:hidden">Total</div>
                        <div className="font-bold">{product.total} $</div>
                    </div>
                    <div className="absolute top-4 right-0 md:static md:text-right">
                        <button
                            onClick={() => cartStore.removeProduct(product.id)}
                            className="p-2 text-red-400 cursor-pointer"
                            title="Remove Item"
                        >
                            <Trash className="w-4 md:w-5" />
                        </button>
                    </div>
                </div>
            ))}
            <div className="text-right text-2xl font-bold my-8">
                Total: <span className="text-sky-500">{total}</span> $
            </div>
        </>
    );
};

export default CartTable;
