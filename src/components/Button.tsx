import { ButtonProps } from '@/types/props';
import { ReactNode } from 'react';

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
                    ? 'text-white border w-fit px-12 py-4 font-roboto font-normal text-xs rounded-md lg:text-base md:text-base'
                    : 'text-xs font-poppins font-light underline underline-offset-2 mt-1 w-fit'
            }
        >
            {children}
        </button>
    );
}
