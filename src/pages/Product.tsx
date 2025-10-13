import { useParams } from 'react-router';
import type { Product } from '../types/Types';
import useFetch from '../hooks/useFetch';
import Title from '../components/ui/Title';
import { discountPriceCalc } from '../utlis/price';
import { Minus, Plus, Ruler, Shield, Star, Truck } from 'lucide-react';
import { dateFormat } from '../utlis/dateFormat';
import { useState } from 'react';
import { cartStore } from '../store/cartStore';
import Button from '../components/ui/Button';

const Product = () => {
    const { id } = useParams();
    const [qty, setQty] = useState<string | number>(1);
    const { data, error, loading } = useFetch<Product>(
        `https://dummyjson.com/products/${id}`
    );

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setQty('');
            return;
        }
        const num = Number(value);
        if (data) {
            setQty(Math.min(Math.max(num, 1), data.stock));
        }
    };

    const handlePlusQty = () => {
        if (data) {
            setQty(Number(qty) < data.stock ? Number(qty) + 1 : data.stock);
        }
    };
    const handleMinusQty = () => {
        if (data) {
            setQty(Number(qty) <= 1 ? 1 : Number(qty) - 1);
        }
    };

    const handleAddProduct = () => {
        if (data) {
            cartStore.addProducts(data, Number(qty));
            setQty(1);
        }
    };

    return (
        <div>
            {data && (
                <>
                    <Title type="h1" className="mb-8">
                        <span className="text-sky-500 capitalize">
                            {data.title.split('-').join(' ')}
                        </span>
                    </Title>
                    <div className="grid gap-4 mb-8 md:grid-cols-12">
                        <div className="md:col-span-6 lg:col-span-4">
                            <div className="border border-black/10 mb-2">
                                <img
                                    src={data.images[0]}
                                    alt={data.title}
                                    width="1100px"
                                    height="1100px"
                                />
                            </div>
                            <div className="flex overflow-auto gap-2">
                                {data.images.map((link) => (
                                    <div
                                        key={link}
                                        className="border border-black/10 w-20"
                                    >
                                        <img
                                            src={link}
                                            alt={data.title}
                                            width="1100px"
                                            height="1100px"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-4 lg:gap-8 md:col-span-6 md:self-start lg:col-start-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-sky-500">
                                    {data.brand}
                                </h2>
                                <span className="text-xs font-medium text-black/50">
                                    SKU: {data.sku}
                                </span>
                            </div>
                            <article>{data.description}</article>
                            <div className="flex items-baseline gap-4">
                                <b className="text-xl font-bold text-sky-600">
                                    {discountPriceCalc(
                                        data.price,
                                        data.discountPercentage
                                    )}
                                    $
                                </b>
                                <div className="text-base text-red-800 line-through">
                                    {data.price} $
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <button
                                        onClick={handleMinusQty}
                                        className="bg-sky-500 text-white w-12 h-12 flex items-center justify-center rounded-bl-xl rounded-tl-xl hover:bg-sky-600 cursor-pointer"
                                        title="Minus"
                                    >
                                        <Minus />
                                    </button>
                                    <input
                                        value={qty}
                                        onChange={handleChangeQuantity}
                                        className="h-12 border-t border-b border-sky-500 w-12 text-center text-xl font-semibold"
                                        type="number"
                                    />
                                    <button
                                        onClick={handlePlusQty}
                                        className="bg-sky-500 text-white w-12 h-12 flex items-center justify-center rounded-br-xl rounded-tr-xl hover:bg-sky-600 cursor-pointer"
                                        title="Plus"
                                    >
                                        <Plus />
                                    </button>
                                    <Button
                                        className="ml-4"
                                        size="large"
                                        onClick={handleAddProduct}
                                    >
                                        Add to cart
                                    </Button>
                                </div>
                                <div className="grid self-center font-semibold leading-tight lg:flex lg:gap-2 lg:text-xl lg:ml-8">
                                    <span>{data.availabilityStatus}</span>
                                    <span>{data.stock} pcs</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
                                <div className="flex items-center gap-2">
                                    <Truck className="text-sky-500" />
                                    <span className="font-bold text-black/70">
                                        {data.shippingInformation}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="text-sky-500" />
                                    <span className="font-bold text-black/70">
                                        {data.warrantyInformation}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Ruler className="text-sky-500" />
                                    <span className="font-bold text-black/70">
                                        {`${data.dimensions.width} X ${data.dimensions.height} X ${data.dimensions.depth} in`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Title type="h3" className="mb-6">
                        Reviews
                    </Title>
                    <div className="grid gap-4">
                        {data.reviews.map((review) => (
                            <div className="border border-black/10 rounded-xl">
                                <div className="flex justify-between px-4 py-2 border-b border-black/10">
                                    <span className="font-bold text-sky-500">
                                        {review.reviewerName}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {Array.from({
                                            length: review.rating,
                                        }).map((_, i) => (
                                            <Star
                                                size={16}
                                                key={i}
                                                className="text-amber-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p>{review.comment}</p>
                                </div>
                                <div className="px-4 py-2 border-t border-black/10 text-xs font-semibold text-slate-500">
                                    {dateFormat(review.date)}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
