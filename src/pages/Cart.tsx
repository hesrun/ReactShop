import { observer } from 'mobx-react-lite';
import { cartStore } from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';
import Title from '../components/ui/Title';
import CartTable from '../components/common/cart/CartTable';
import CartForm from '../components/common/cart/CartForm';
import Cap from '../components/ui/Cap';
import { userStore } from '../store/userStore';
import CartAdressess from '../components/common/cart/CartAdressess';
import { useState } from 'react';
import type { Address } from '../types/Types';
import CartDelivery from '../components/common/cart/CartDelivery';
import { addressStore } from '../store/addressStore';

const Cart = observer(() => {
    const [pickedAddress, setPickedAddress] = useState<Address | null>(null);

    return (
        <div>
            <Title type="h1" className="mb-8">
                Cart
            </Title>

            {cartStore.totalItems > 0 && (
                <>
                    <CartTable />

                    <CartDelivery />

                    <Title type="h2" className="mb-8">
                        Personal data
                    </Title>

                    {userStore.user && addressStore.addresses.length > 0 && (
                        <CartAdressess onClick={setPickedAddress} />
                    )}

                    <CartForm
                        data={cartStore.cart}
                        total={cartStore.totalSum}
                        address={pickedAddress}
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
