import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../../ui/Input';
import type { CartProduct, NewOrder } from '../../../types/Types';
import { ordersStore } from '../../../store/ordersStore';
import { useNavigate } from 'react-router';
import { cartStore } from '../../../store/cartStore';
import Button from '../../ui/Button';
import { observer } from 'mobx-react-lite';

interface FormInput {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    comment: string;
}

interface CartFormProps {
    data: CartProduct[];
    total: string;
}

const CartForm = observer(({ data, total }: CartFormProps) => {
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<FormInput>({
        shouldFocusError: false,
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            address: '',
            comment: '',
        },
    });

    const onSubmit: SubmitHandler<FormInput> = async (formData) => {
        await ordersStore.addOrder({
            ...formData,
            cart: JSON.stringify(data),
            total: total,
        } as NewOrder);

        if (ordersStore.lastOrder) {
            cartStore.clearCart();
            navigate(`/success/`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-4 gap-y-8 items-start"
        >
            <Controller
                name="fullName"
                control={control}
                rules={{
                    required: 'Name is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                }}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        type="text"
                        label="Full Name"
                        error={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="phone"
                control={control}
                rules={{
                    required: 'Phone number is required',
                    minLength: { value: 7, message: 'Minimum 7 numbers' },
                }}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        type="tel"
                        label="Phone"
                        error={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Incorrect Email',
                    },
                }}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        type="email"
                        label="Email"
                        error={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="address"
                control={control}
                rules={{ required: 'Adress is required' }}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        type="text"
                        label="Full Adress"
                        error={fieldState.error?.message}
                    />
                )}
            />
            <div className="col-span-2">
                <Controller
                    name="comment"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            type="textarea"
                            label="Comment"
                            error={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <div className="col-span-2">
                <Button
                    type="submit"
                    color="blue"
                    loading={ordersStore.loading}
                    disabled={ordersStore.loading}
                >
                    Make Order
                </Button>
            </div>
        </form>
    );
});

export default CartForm;
