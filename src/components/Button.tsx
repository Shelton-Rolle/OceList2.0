import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode | ReactNode[];
    color: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    style: 'button' | 'link';
}

export default function Button({
    children,
    color,
    onClick,
    type,
    style,
}: ButtonProps) {
    return (
        <button
            style={
                style === 'button'
                    ? { borderColor: color, backgroundColor: color }
                    : { color }
            }
            onClick={onClick}
            type={type}
            className={
                style === 'button'
                    ? 'text-white border w-fit px-12 py-4 font-roboto font-normal text-xs rounded-md'
                    : 'text-xs font-poppins font-light underline underline-offset-2 mt-1 w-fit'
            }
        >
            {children}
        </button>
    );
}
