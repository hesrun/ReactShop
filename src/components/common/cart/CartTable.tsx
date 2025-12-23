import { Link } from 'react-router';
import { Minus, Plus, Trash } from 'lucide-react';
import { discountPriceCalc } from '../../../utlis/price';
import { cartStore } from '../../../store/cartStore';
import { observer } from 'mobx-react-lite';

const CartTable = observer(() => {
    const handleQuantityChange = (id: number, qty: number) => {
        cartStore.adjustQuantity(id, qty);
    };

    return (
        <>
            <div className="hidden gap-2 md:grid grid-cols-[5fr_1fr_1fr_1fr_50px] border-b border-sky-500 text-sky-500 font-semibold pb-4">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
                <div></div>
            </div>
            {cartStore.cart.map((product) => (
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
                    <div className="self-center">
                        <div className="flex">
                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        product.id,
                                        product.quantity - 1
                                    )
                                }
                                className="bg-sky-500 text-white w-8 h-8 flex items-center justify-center rounded-bl-xl rounded-tl-xl hover:bg-sky-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Minus"
                                disabled={product.quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                            <input
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    handleQuantityChange(
                                        product.id,
                                        Number(e.target.value)
                                    )
                                }
                                value={product.quantity}
                                className="h-8 border-t border-b border-sky-500 w-8 text-center font-semibold"
                                type="number"
                            />
                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        product.id,
                                        product.quantity + 1
                                    )
                                }
                                className="bg-sky-500 text-white w-8 h-8 flex items-center justify-center rounded-br-xl rounded-tr-xl hover:bg-sky-600 cursor-pointer"
                                title="Plus"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
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
            <div className="text-right my-8">
                <table className="font-bold ml-auto">
                    <tbody>
                        <tr>
                            <td>Products total:</td>
                            <td className="pl-4 text-sky-500">
                                {cartStore.totalProductsSum} $
                            </td>
                        </tr>
                        {cartStore.delivery && (
                            <tr>
                                <td>Delivery:</td>
                                <td className="pl-4 text-sky-500">
                                    {cartStore.deliveryPrice} $
                                </td>
                            </tr>
                        )}
                        <tr className="text-xl">
                            <td>Total:</td>
                            <td className="pl-4 text-sky-500">
                                {cartStore.totalSum} $
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
});

export default CartTable;
