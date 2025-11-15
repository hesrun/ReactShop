import type { JSX } from 'react';

interface CapProps {
    icon: JSX.Element;
    text: string;
}

const Cap = ({ icon, text }: CapProps) => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[30vh] lg:min-h-[50vh]">
            {icon}
            <span className="text-xl font-bold">{text}</span>
        </div>
    );
};

export default Cap;
