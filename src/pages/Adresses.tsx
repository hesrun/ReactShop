import { LucideHouse, LucidePlusCircle } from 'lucide-react';
import Cap from '../components/ui/Cap';
import Title from '../components/ui/Title';
import Button from '../components/ui/Button';
import { modalStore } from '../store/modalStore';
import { addressStore } from '../store/addressStore';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import AddAddressModal from '../components/common/adressess/AddAddressModal';
import AddressesTable from '../components/common/adressess/AddressesTable';
import type { Address } from '../types/Types';

const Adresses = observer(() => {
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    useEffect(() => {
        addressStore.getAddresses();
    }, []);

    const handleDelete = (id: number) => {
        addressStore.deleteAddress(id);
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        modalStore.open();
    };

    const handleAdd = () => {
        setEditingAddress(null);
        modalStore.open();
    };

    return (
        <>
            <Title type="h1" className="relative">
                Mу adresses
                <Button onClick={handleAdd} className="absolute right-0 top-0">
                    <LucidePlusCircle />
                    Add Address
                </Button>
            </Title>
            {addressStore.addresses.length > 0 ? (
                <AddressesTable
                    data={addressStore.addresses}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            ) : (
                <Cap
                    icon={<LucideHouse size={48} className="text-sky-500" />}
                    text="No have adresses"
                />
            )}

            <AddAddressModal address={editingAddress} />
        </>
    );
});

export default Adresses;
