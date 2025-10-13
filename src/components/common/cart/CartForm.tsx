import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../../ui/Input';
import type { CartProduct } from '../../../types/Types';
import { ordersStore } from '../../../store/ordersStore';

interface FormInput {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    comment: string;
}

const CartForm = ({ data }: { data: CartProduct[] }) => {
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

    const onSubmit: SubmitHandler<FormInput> = (formData) => {
        ordersStore.addOrder({
            ...formData,
            cart: JSON.stringify(data),
        });
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Make Order
                </button>
            </div>
        </form>
    );
};

export default CartForm;
