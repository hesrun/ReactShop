import type { Address } from '../../../types/Types';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { addressStore } from '../../../store/addressStore';
import Modal from '../../ui/Modal';
import { modalStore } from '../../../store/modalStore';
import Input from '../../ui/Input';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

interface AddAddressModalProps {
    address?: Address | null; // null для добавления нового
}

const AddAddressModal = observer(({ address }: AddAddressModalProps) => {
    const { control, handleSubmit, reset } = useForm<Address>({
        shouldFocusError: false,
        defaultValues: address ?? {
            city: '',
            street: '',
            zip: '',
        },
    });

    useEffect(() => {
        reset(address ?? { city: '', street: '', zip: '' });
    }, [address]);

    const onSubmit: SubmitHandler<Address> = async (formData) => {
        if (address?.id) {
            await addressStore.editAddress(formData, address.id);
        } else {
            await addressStore.addAddress(formData);
        }
        reset();
        modalStore.close();
    };

    const handleCancel = () => {
        reset();
        modalStore.close();
    };

    return (
        <>
            <Modal
                title="Address"
                onSuccess={handleSubmit(onSubmit)}
                onCancel={handleCancel}
                formId="addressForm"
                isloading={addressStore.loading}
            >
                <form className="grid gap-4" id="addressForm">
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: 'City is required' }}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                type="text"
                                label="City"
                                error={fieldState.error?.message}
                                className="grow"
                            />
                        )}
                    />
                    <Controller
                        name="street"
                        control={control}
                        rules={{ required: 'Street is required' }}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                type="text"
                                label="Street"
                                error={fieldState.error?.message}
                                className="grow"
                            />
                        )}
                    />
                    <Controller
                        name="zip"
                        control={control}
                        rules={{ required: 'Zip is required' }}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                type="text"
                                label="Zip"
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </form>
            </Modal>
        </>
    );
});

export default AddAddressModal;
