import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'blue' | 'red' | 'green' | 'gray' | 'white';
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
        blue: 'bg-sky-500 hover:bg-sky-600 text-white active:bg-sky-700',
        red: 'bg-red-500 hover:bg-red-600 text-white active:bg-red-700',
        green: 'bg-green-500 hover:bg-green-600 text-white active:bg-green-700',
        gray: 'bg-gray-500 hover:bg-gray-600 text-white active:bg-gray-700',
        white: 'border border-gray-400 text-gray-800 hover:bg-gray-300 hover:border-gray-300 active:bg-gray-400',
    };
    const sizeClasses = {
        small: 'px-3 h-8 text-sm rounded-md',
        medium: 'px-4 h-10 text-base rounded-lg',
        large: 'px-6 h-12 text-lg rounded-xl',
    };
    const classes = clsx(
        'flex items-center justify-center gap-2 font-semibold transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:pointer-events-none',
        colorClasses[color],
        sizeClasses[size],
        className
    );

    return (
        <button {...props} onClick={onClick} className={classes}>
            {!loading && children}
            {loading && (
                <>
                    Loading
                    <LoaderCircle className="animate-spin" />
                </>
            )}
        </button>
    );
};

export default Button;
