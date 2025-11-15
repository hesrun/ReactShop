import { useEffect } from 'react';
import Title from '../components/ui/Title';
import { ordersStore } from '../store/ordersStore';
import { observer } from 'mobx-react-lite';
import { LucideNotebookText } from 'lucide-react';
import Cap from '../components/ui/Cap';
import OrdersTable from '../components/common/orders/OrdersTable';
import LoadSpinner from '../components/ui/LoadSpinner';

const Orders = observer(() => {
    useEffect(() => {
        ordersStore.getOrders();
    }, []);

    return (
        <>
            <Title type="h1" className="mb-8">
                Orders
            </Title>
            {ordersStore.loading && <LoadSpinner />}
            {!ordersStore.loading &&
                (!ordersStore.orders || ordersStore.orders.length === 0) && (
                    <Cap
                        icon={
                            <LucideNotebookText
                                size={48}
                                className="text-sky-500"
                            />
                        }
                        text="Orders are empty"
                    />
                )}
            {!ordersStore.loading &&
                ordersStore.orders &&
                ordersStore.orders.length > 0 && (
                    <OrdersTable data={ordersStore.orders} />
                )}
        </>
    );
});

export default Orders;
