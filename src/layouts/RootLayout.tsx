import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode | ReactNode[];
}

export default function RootLayout({ children }: RootLayoutProps) {
    return <main className="px-6">{children}</main>;
}
