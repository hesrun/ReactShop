import { useParams } from 'react-router';
import Title from '../components/ui/Title';
import { useEffect } from 'react';
import { ordersStore } from '../store/ordersStore';
import { observer } from 'mobx-react-lite';
import OrderInfo from '../components/common/order/OrderInfo';
import LoadSpinner from '../components/ui/LoadSpinner';

const Order = observer(() => {
    const params = useParams();

    useEffect(() => {
        if (params.id) ordersStore.getOrder(Number(params.id));
    }, [params.id]);

    return (
        <>
            <Title type="h1" className="mb-8">
                Order #{params.id}
            </Title>
            {ordersStore.loading && <LoadSpinner />}
            {!ordersStore.loading && ordersStore.order && (
                <OrderInfo data={ordersStore.order} />
            )}
            {/* <pre>{JSON.stringify(ordersStore.order, null, 2)}</pre> */}
        </>
    );
});

export default Order;
