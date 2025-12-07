import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { addressStore } from '../../../store/addressStore';
import Button from '../../ui/Button';
import type { Address } from '../../../types/Types';

interface CartAdressessProps {
    onClick: (address: Address) => void;
}

const CartAdressess = observer(({ onClick }: CartAdressessProps) => {
    useEffect(() => {
        addressStore.getAddresses();
    }, []);
    return (
        <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="text-sky-500 font-semibold">My addresses:</div>
            {addressStore.addresses.map((item) => (
                <Button
                    key={item.id}
                    color="white"
                    onClick={() => onClick(item)}
                >{`${item.city}, ${item.street}, ${item.zip}`}</Button>
            ))}
        </div>
    );
});

export default CartAdressess;
