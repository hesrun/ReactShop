import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'blue' | 'red' | 'green';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
}

const Button = ({
    children,
    size = 'medium',
    color = 'blue',
    loading,
    onClick,
    className,
    ...props
}: ButtonProps) => {
    const colorClasses = {
        blue: 'bg-sky-500 hover:bg-sky-600 text-white',
        red: 'bg-red-500 hover:bg-red-600 text-white',
        green: 'bg-green-500 hover:bg-green-600 text-white',
    };
    const sizeClasses = {
        small: 'px-3 h-8 text-sm rounded-md',
        medium: 'px-4 h-10 text-base rounded-lg',
        large: 'px-6 h-12 text-lg rounded-xl',
    };
    const classes = clsx(
        'flex items-center justify-center gap-2 font-semibold transition-colors duration-200 cursor-pointer',
        colorClasses[color],
        sizeClasses[size],
        className
    );

    return (
        <button {...props} onClick={onClick} className={classes}>
            {children}
            {loading && <LoaderCircle className="animate-spin" />}
        </button>
    );
};

export default Button;
