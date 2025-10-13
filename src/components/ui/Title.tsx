import clsx from 'clsx';
import { type ReactNode } from 'react';

interface TitleProps {
    className?: string;
    children: ReactNode;
    type: 'h1' | 'h2' | 'h3';
}

const Title = ({ children, type, className }: TitleProps) => {
    const Title = type;
    return (
        <Title
            className={clsx(
                'font-bold border-b border-b-black/10',
                type === 'h1' && 'text-3xl',
                type === 'h2' && 'text-2xl',
                type === 'h3' && 'text-xl',
                className
            )}
        >
            <span className="inline-block border-b-4 border-b-sky-500 pb-2 mb-[-1px]">
                {children}
            </span>
        </Title>
    );
};

export default Title;
