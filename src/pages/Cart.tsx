import { observer } from 'mobx-react-lite';
import { cartStore } from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';
import Title from '../components/ui/Title';
import CartTable from '../components/common/cart/CartTable';
import CartForm from '../components/common/cart/CartForm';

const Cart = observer(() => {
    return (
        <div>
            <Title type="h1" className="mb-8">
                Cart
            </Title>
            {cartStore.totalItems > 0 && (
                <>
                    <CartTable
                        data={cartStore.cart}
                        total={cartStore.totalSum}
                    />
                    <Title type="h2" className="mb-8">
                        Personal data
                    </Title>
                    <CartForm data={cartStore.cart} />
                </>
            )}
            {cartStore.totalItems === 0 && (
                <div className="flex flex-col gap-4 items-center justify-center min-h-[30vh] lg:min-h-[50vh]">
                    <ShoppingCart size={48} className="text-sky-500" />
                    <span className="text-xl font-bold">Cart is empty</span>
                </div>
            )}
        </div>
    );
});

export default Cart;
