import { ShoppingCart } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { cartStore } from '../../../store/cartStore';

const HeaderCartBtn = observer(() => {
    return (
        <Link
            to="/cart"
            className="flex items-center text-black/70 font-bold gap-1 hover:text-sky-500 relative"
        >
            <ShoppingCart className="text-sky-500" />
            <span className="hidden lg:inline">Cart</span>
            {cartStore.totalItems > 0 && (
                <span className="absolute left-3 -top-1 bg-black text-white text-[.625rem] px-[.25rem] min-w-4 leading-[1rem] rounded-2xl text-center">
                    {cartStore.totalItems}
                </span>
            )}
        </Link>
    );
});

export default HeaderCartBtn;
