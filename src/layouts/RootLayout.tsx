import { PageHeader } from '@/components/PageHeader';
import { RootLayoutProps } from '@/types/props';
import { ReactNode } from 'react';

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <main className="px-6 lg:max-w-7xl lg:mx-auto">
            <PageHeader />
            <div className="mt-6">{children}</div>
        </main>
    );
}
