import { LoginInputProps } from '@/types/props';

export default function LoginInput({
    id,
    label,
    placeholder,
    error,
    HandleChange,
    type,
}: LoginInputProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="flex flex-col text-xs font-bold font-poppins lowercase text-ocGray focus:text-black"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="login-input font-poppins font-light outline-none rounded-md border border-ocGray text-ocGray text-xs placeholder:text-xs placeholder:text-ocGray placeholder:font-light placeholder:font-poppins focus:border-black focus:text-black py-2 px-5 mb-1"
                onChange={(e) => HandleChange(e.target.value)}
            />
            {error && (
                <p className="text-xs font-poppins font-medium text-error mb-4">
                    {error}
                </p>
            )}
        </div>
    );
}
