import { useParams } from 'react-router';
import type { Product as ProductType } from '../types/Types';
import useFetch from '../hooks/useFetch';
import Title from '../components/ui/Title';
import { discountPriceCalc } from '../utlis/price';
import {
    LucideHeartMinus,
    LucideHeartPlus,
    Minus,
    Plus,
    Ruler,
    Shield,
    Star,
    Truck,
} from 'lucide-react';
import { dateFormat } from '../utlis/dateFormat';
import { useState } from 'react';
import { cartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import NotFound from './NotFound';
import { favoriteStore } from '../store/favoriteStore';
import { userStore } from '../store/userStore';

const Product = observer(() => {
    const { id } = useParams();
    const [currentImage, setCurrentImage] = useState(0);
    const [qty, setQty] = useState<string | number>(1);
    const { data, error } = useFetch<ProductType>(
        `https://dummyjson.com/products/${id}`
    );

    const changeImageHandle = (index: number) => {
        setCurrentImage(index);
    };

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

    if (error) {
        return <NotFound />;
    }

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
                                    src={data.images[currentImage]}
                                    alt={data.title}
                                    width="1100px"
                                    height="1100px"
                                />
                            </div>
                            {data.images.length > 1 && (
                                <div className="flex overflow-auto gap-2">
                                    {data.images.map((img, index) => (
                                        <button
                                            onClick={() =>
                                                changeImageHandle(index)
                                            }
                                            key={img}
                                            className={clsx(
                                                'border border-black/10 w-20 border-gray-100 cursor-pointer',
                                                currentImage === index &&
                                                    'border-sky-500'
                                            )}
                                        >
                                            <img
                                                src={img}
                                                alt={data.title}
                                                width="1100px"
                                                height="1100px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
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
                            <div className="">
                                <div className="flex items-center gap-4 lg:max-w-[400px]">
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
                                    </div>
                                    <Button
                                        className="grow"
                                        size="large"
                                        color={
                                            cartStore.isIncart(data.id)
                                                ? 'green'
                                                : 'blue'
                                        }
                                        onClick={handleAddProduct}
                                    >
                                        {cartStore.isIncart(data.id)
                                            ? 'Add more'
                                            : 'Add to cart'}
                                    </Button>
                                    {userStore.user && (
                                        <button
                                            className="cursor-pointer hover:opacity-75 active:scale-105"
                                            onClick={() =>
                                                favoriteStore.toggleFavorite(
                                                    data.id
                                                )
                                            }
                                            title={
                                                favoriteStore.isFavorite(
                                                    data.id
                                                )
                                                    ? 'Remove from favorites'
                                                    : 'Add to favorites'
                                            }
                                        >
                                            {favoriteStore.isFavorite(
                                                data.id
                                            ) ? (
                                                <LucideHeartMinus className="text-rose-600" />
                                            ) : (
                                                <LucideHeartPlus className="text-sky-500" />
                                            )}
                                        </button>
                                    )}
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
                            <div
                                key={review.comment}
                                className="border border-black/10 rounded-xl"
                            >
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
});

export default Product;
