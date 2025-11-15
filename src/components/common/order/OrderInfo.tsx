import type { CartProduct, Order } from '../../../types/Types';
import { dateFormat } from '../../../utlis/dateFormat';

const OrderInfo = ({ data }: { data: Order }) => {
    const {
        address,
        cart: cartJson,
        email,
        fullName,
        phone,
        total,
        created_at,
        comment,
    } = data ?? {};

    const cartItems: CartProduct[] = cartJson ? JSON.parse(cartJson) : [];

    return (
        <>
            <table className="mb-8">
                <tbody>
                    <tr>
                        <td className="border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600">
                            Full name
                        </td>
                        <td className="border border-black/10 px-4 py-2">
                            {fullName}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600">
                            Address
                        </td>
                        <td className="border border-black/10 px-4 py-2">
                            {address}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600">
                            Phone Number
                        </td>
                        <td className="border border-black/10 px-4 py-2">
                            {phone}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600">
                            Email
                        </td>
                        <td className="border border-black/10 px-4 py-2">
                            {email}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600">
                            Create date
                        </td>
                        <td className="border border-black/10 px-4 py-2">
                            {created_at && dateFormat(created_at)}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black/10 px-4 py-2 text-sm font-semibold text-slate-600">
                            Comment to order
                        </td>
                        <td className="border border-black/10 px-4 py-2">
                            {comment}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="w-full ">
                <thead>
                    <tr>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Image
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Name
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Quantity
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2 text-right">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td className="w-20 py-4 pr-4 border-b border-black/10">
                                <img
                                    className="border border-black/10"
                                    src={item.images[0]}
                                    alt=""
                                />
                            </td>
                            <td className="py-4 pr-4 border-b border-black/10">
                                {item.title}
                            </td>
                            <td className="py-4 pr-4 border-b border-black/10">
                                {`${item.price}$ X 
                                ${item.quantity}`}
                            </td>
                            <td className="text-right py-4 border-b border-black/10 font-bold">
                                {item.total}$
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-4 justify-end mt-4 items-baseline  text-xl">
                <div className="text-sky-500 font-bold">Total:</div>
                <div className="font-bold">{total}$</div>
            </div>
        </>
    );
};

export default OrderInfo;
