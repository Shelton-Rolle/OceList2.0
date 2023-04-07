import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface NavItemProps {
    label: string | ReactNode;
    href: string;
    active: boolean;
}

export const PageHeader = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const NavItem = ({ label, href, active }: NavItemProps) => (
        <Link
            className={`relative ${
                active && 'text-blue-300'
            } font-roboto font-bold max-md:uppercase text-2xl md:font-poppins
            md:font-normal md:text-lg duration-150 hover:text-blue-300`}
            href={href}
        >
            {label}
        </Link>
    );

    return (
        <header className="relative p-6 z-20">
            <div className="fixed right-0 top-0 w-full px-6 py-6 bg-opacity-80 bg-background-light backdrop-blur-sm z-10 md:hidden">
                <button
                    id="menu button"
                    className="relative w-12 flex flex-col gap-1 ml-auto md:hidden z-20"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div
                        className={`w-full h-1 bg-black rounded-full ml-auto ${
                            isMenuOpen
                                ? 'animate-open-line-1'
                                : 'animate-close-line-1'
                        }`}
                    />
                    <div
                        className={`w-1/2 h-1 bg-black rounded-full ml-auto ${
                            isMenuOpen
                                ? 'animate-open-line-2'
                                : 'animate-close-line-2'
                        }`}
                    />
                    <div
                        className={`w-1/4 h-1 bg-black rounded-full ml-auto ${
                            isMenuOpen
                                ? 'animate-open-line-3'
                                : 'animate-close-line-3'
                        }`}
                    />
                </button>
            </div>
            <nav
                className={`max-md:fixed top-0 ${
                    isMenuOpen ? 'left-0' : '-left-full'
                } w-full h-screen bg-white flex items-center p-6 md:w-full md:h-fit md:fixed md:top-0 md:left-0`}
            >
                <div className="flex flex-col gap-4 md:flex-row md:justify-end md:w-full md:max-w-tablet md:mx-auto lg:max-w-desktop lg:gap-7">
                    <NavItem
                        label="Home"
                        href="/"
                        active={router.asPath === '/'}
                    />
                    <NavItem
                        label="Browse"
                        href="/browse"
                        active={router.asPath.split('/')[1] === 'browse'}
                    />
                </div>
            </nav>
        </header>
    );
};
