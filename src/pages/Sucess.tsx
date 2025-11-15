import { LucideCircleCheckBig } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router';
import { userStore } from '../store/userStore';
import { ordersStore } from '../store/ordersStore';
import { useEffect } from 'react';

const Success = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!ordersStore.lastOrder) {
            navigate('/');
        }
    }, []);

    return (
        <>
            {ordersStore.lastOrder && (
                <div className="flex flex-col justify-center items-center text-center min-h-[40vh] gap-4">
                    <LucideCircleCheckBig className="w-20 h-20 text-green-500" />
                    <div className="text-2xl leading-none">
                        <span className="text-sky-500 font-semibold">
                            Order #{ordersStore.lastOrder.id}
                        </span>{' '}
                        was created successfully
                    </div>
                    {userStore.user ? (
                        <Link
                            className="text-sky-500 underline hover:no-underline"
                            to={`/account/orders/${ordersStore.lastOrder.id}`}
                        >
                            Wiew order
                        </Link>
                    ) : (
                        <Link
                            className="text-sky-500 underline hover:no-underline"
                            to={`/`}
                        >
                            Back to main page
                        </Link>
                    )}
                </div>
            )}
        </>
    );
});

export default Success;
