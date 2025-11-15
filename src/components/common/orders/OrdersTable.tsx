import { Link } from 'react-router';
import type { Order } from '../../../types/Types';
import { LucideTrash } from 'lucide-react';
import { ordersStore } from '../../../store/ordersStore';
import { observer } from 'mobx-react-lite';

const OrdersTable = observer(({ data }: { data: Order[] }) => {
    return (
        <>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Order ID
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Name
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Email
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Phone
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2">
                            Total
                        </th>
                        <th className="text-left border-b border-sky-500 pb-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="py-4">
                                <Link
                                    className="text-sky-500 underline"
                                    to={`${item.id}`}
                                >{`#${item.id}`}</Link>
                            </td>
                            <td className="py-4">{item.fullName}</td>
                            <td className="py-4">{item.email}</td>
                            <td className="py-4">{item.phone}</td>
                            <td className="py-4 font-bold">{item.total}$</td>
                            <td className="py-4 w-8">
                                <button
                                    className="p-2 text-red-400 cursor-pointer"
                                    title="delete order"
                                    onClick={() =>
                                        ordersStore.deleteOrder(item.id)
                                    }
                                >
                                    <LucideTrash size={24} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
});

export default OrdersTable;
