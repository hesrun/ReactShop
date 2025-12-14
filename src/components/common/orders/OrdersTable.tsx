import { Link } from 'react-router';
import type { Order } from '../../../types/Types';
import { LucideTrash } from 'lucide-react';
import { ordersStore } from '../../../store/ordersStore';
import { observer } from 'mobx-react-lite';

const OrdersTable = observer(({ data }: { data: Order[] }) => {
    return (
        <>
            <div className="hidden md:grid grid-cols-[120px_1fr_1fr_1fr_100px_50px] gap-4 border-b border-sky-500 text-sky-500 font-semibold pb-4">
                <div>Order</div>
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Total</div>
                <div></div>
            </div>

            {data.map((item) => (
                <div
                    key={item.id}
                    className="relative py-4 grid grid-cols-2 gap-2 border-b border-black/10 first:pt-0 md:grid-cols-[120px_1fr_1fr_1fr_100px_50px] md:items-center"
                >
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Order
                        </div>
                        <Link
                            to={`${item.id}`}
                            className="text-sky-500 font-bold underline"
                        >
                            {`#${item.id}`}
                        </Link>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Name
                        </div>
                        <div className="font-bold">{item.fullName}</div>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Email
                        </div>
                        <div className="font-bold">{item.email}</div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Phone
                        </div>
                        <div className="font-bold">{item.phone}</div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="text-sm text-gray-500 md:hidden">
                            Total
                        </div>
                        <div className="font-bold text-sky-500">
                            {item.total}$
                        </div>
                    </div>

                    <div className="absolute top-4 right-0 md:static md:text-right">
                        <button
                            className="p-2 text-red-400 cursor-pointer"
                            title="delete order"
                            onClick={() => ordersStore.deleteOrder(item.id)}
                        >
                            <LucideTrash size={20} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
});

export default OrdersTable;
