import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../../ui/Input';
import type { Address, CartProduct, NewOrder } from '../../../types/Types';
import { ordersStore } from '../../../store/ordersStore';
import { useNavigate } from 'react-router';
import { cartStore } from '../../../store/cartStore';
import Button from '../../ui/Button';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../store/userStore';
import { useEffect } from 'react';
import useSendOrderEmail from '../../../hooks/useSendOrderEmail';
import { toast } from 'react-toastify';

interface FormInput {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    street: string;
    zip: string;
    comment: string;
}

interface CartFormProps {
    data: CartProduct[];
    total: number;
    address: Address | null;
}

const CartForm = observer(({ data, total, address }: CartFormProps) => {
    const { sendEmail, error: emailError } = useSendOrderEmail();
    const navigate = useNavigate();

    const { control, handleSubmit, reset, getValues } = useForm<FormInput>({
        shouldFocusError: false,
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            city: '',
            street: '',
            zip: '',
            comment: '',
        },
    });

    const onSubmit: SubmitHandler<FormInput> = async (formData) => {
        const order = {
            ...formData,
            cart: JSON.stringify(data),
            total: total,
        };

        await ordersStore.addOrder(order as NewOrder);

        if (ordersStore.lastOrder) {
            const ok = await sendEmail(ordersStore.lastOrder);
            if (!ok) {
                toast.error(emailError || 'Email not sent');
            } else {
                toast.success('Email sent!');
            }

            cartStore.clearCart();
            navigate(`/success/`);
        }
    };

    useEffect(() => {
        if (!userStore.user?.email) return;

        const prev = getValues();
        reset({
            ...prev,
            email: userStore.user.email,
        });
    }, [reset, getValues]);

    useEffect(() => {
        if (!address) return;

        const prev = getValues();
        reset({
            ...prev,
            ...address,
        });
    }, [address, reset, getValues]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid md:grid-cols-3 gap-4">
                <Controller
                    name="fullName"
                    control={control}
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 6,
                            message: 'Minimum 6 characters',
                        },
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
            </div>
            <div className="grid md:grid-cols-[1fr_1fr_0.4fr] gap-4">
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
            </div>
            <div>
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
            <div>
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
