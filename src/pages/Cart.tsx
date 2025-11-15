import { observer } from 'mobx-react-lite';
import { cartStore } from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';
import Title from '../components/ui/Title';
import CartTable from '../components/common/cart/CartTable';
import CartForm from '../components/common/cart/CartForm';
import Cap from '../components/ui/Cap';

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
                    <CartForm
                        data={cartStore.cart}
                        total={cartStore.totalSum}
                    />
                </>
            )}
            {cartStore.totalItems === 0 && (
                <Cap
                    icon={<ShoppingCart size={48} className="text-sky-500" />}
                    text="Cart is empty"
                />
            )}
        </div>
    );
});

export default Cart;
