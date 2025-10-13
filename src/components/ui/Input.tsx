import clsx from 'clsx';
import React from 'react';

interface BaseProps {
    placeholder?: string;
    label?: string;
    error?: string;
    className?: string;
    value?: string;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur?: (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    name?: string;
}

type InputProps =
    | (BaseProps &
          React.InputHTMLAttributes<HTMLInputElement> & {
              type: 'text' | 'email' | 'tel' | 'password';
          })
    | (BaseProps &
          React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
              type: 'textarea';
          });

const Input = ({
    type,
    placeholder,
    label,
    error,
    className,
    value,
    onChange,
    onBlur,
    name,
    ...props
}: InputProps) => {
    const baseStyles =
        'border font-semibold border-black/10 rounded-lg focus:border-sky-500 focus:outline-0 px-4';

    const val = value ?? '';

    return (
        <div className={clsx('grid', className)}>
            {label && (
                <label className="font-bold text-sm text-slate-500 mb-1">
                    {label}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    name={name}
                    placeholder={placeholder}
                    className={clsx(baseStyles, 'py-2 min-h-40 resize-y')}
                    value={val}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            ) : (
                <input
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={clsx(baseStyles, 'h-12')}
                    value={val}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            )}

            {error && (
                <span className="text-red-600 text-sm text-right">{error}</span>
            )}
        </div>
    );
};

export default Input;
