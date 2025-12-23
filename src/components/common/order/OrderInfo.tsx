import type { Order } from '../../../types/Types';
import { dateFormat } from '../../../utlis/dateFormat';

const OrderInfo = ({ data }: { data: Order }) => {
    const {
        city,
        street,
        zip,
        cart,
        email,
        fullName,
        phone,
        total,
        created_at,
        comment,
    } = data ?? {};

    return (
        <>
            <div className="mb-8 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10 pb-2">
                    <div className="text-sm font-semibold text-slate-600">
                        Full name
                    </div>
                    <div>{fullName}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10 pb-2">
                    <div className="text-sm font-semibold text-slate-600">
                        Address
                    </div>
                    <div>{`${city}, ${street}, ${zip}`}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10 pb-2">
                    <div className="text-sm font-semibold text-slate-600">
                        Phone Number
                    </div>
                    <div>{phone}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10 pb-2">
                    <div className="text-sm font-semibold text-slate-600">
                        Email
                    </div>
                    <div>{email}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10 pb-2">
                    <div className="text-sm font-semibold text-slate-600">
                        Create date
                    </div>
                    <div>{created_at && dateFormat(created_at)}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pb-2">
                    <div className="text-sm font-semibold text-slate-600">
                        Comment to order
                    </div>
                    <div>{comment}</div>
                </div>
            </div>

            <div className="hidden md:grid grid-cols-[1fr_120px_100px] gap-4 border-b border-sky-500 text-sky-500 font-semibold pb-4">
                <div>Product</div>
                <div>Quantity</div>
                <div className="text-right">Total</div>
            </div>

            {cart.map((item) => (
                <div
                    key={item.id}
                    className="relative py-4 grid grid-cols-2 gap-2 border-b border-black/10 first:pt-0 md:grid-cols-[1fr_120px_100px] md:items-center"
                >
                    <div className="flex items-center gap-4 col-span-2 md:col-span-1">
                        <div className="w-10 lg:w-20 border border-black/10 shrink">
                            <img src={item.images[0]} alt={item.title} />
                        </div>
                        <div className="font-bold">{item.title}</div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden ">
                            Quantity
                        </div>
                        <div className="font-bold">{`${item.price}$ × ${item.quantity}`}</div>
                    </div>

                    <div className="md:col-span-1 md:text-right">
                        <div className="text-sm text-gray-500 md:hidden ">
                            Total
                        </div>
                        <div className="font-bold">{item.total} $</div>
                    </div>
                </div>
            ))}

            <div className="flex gap-4 justify-end mt-4 items-baseline text-xl">
                <div className="text-sky-500 font-bold">Total:</div>
                <div className="font-bold">{total}$</div>
            </div>
        </>
    );
};

export default OrderInfo;
