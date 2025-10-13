import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import Title from '../components/ui/Title';
import { userStore } from '../store/userStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Link, useLocation, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

interface FormInput {
    email: string;
    password: string;
}

const Auth = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignUp = location.pathname === '/signup';

    const { control, handleSubmit } = useForm<FormInput>({
        shouldFocusError: false,
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FormInput> = async (formData) => {
        if (isSignUp) {
            await userStore.signUp(formData);
        } else {
            await userStore.signIn(formData);
        }
        if (userStore.user) {
            navigate('/account');
        }
    };

    return (
        <div>
            <Title type="h1" className="text-center mb-8">
                {location.pathname === '/signup' ? 'Create Account' : 'Sign In'}
            </Title>
            <div className="max-w-120 rounded-2xl mx-auto mt-[10vh] p-8">
                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Minimum 6 characters',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                type="password"
                                label="Password"
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        size="large"
                        color="blue"
                        loading={userStore.loading}
                    >
                        {isSignUp ? 'Create account' : 'Sign In'}
                    </Button>
                </form>
                <div></div>
                <div className="mt-6 text-center">
                    <Link
                        className="text-sky-500 hover:text-sky-600"
                        to={isSignUp ? '/signin' : '/signup'}
                    >
                        {isSignUp ? 'Already have account' : 'Create Account'}
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default Auth;
