import { PageHeader } from '@/components/PageHeader';
import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode | ReactNode[];
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <main className="px-6 lg:max-w-7xl lg:mx-auto pb-28">
            <PageHeader />
            <div className="mt-8">{children}</div>
        </main>
    );
}
