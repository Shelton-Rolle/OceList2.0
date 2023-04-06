import Dashboard from '@/components/Dashboard';
import DashboardLogin from '@/components/DashboardLogin';
import auth from '@/firebase/auth/init';
import RootLayout from '@/layouts/RootLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [loading, setLoading] = useState<boolean | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <RootLayout>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <>{isLoggedIn ? <Dashboard /> : <DashboardLogin />}</>
            )}
        </RootLayout>
    );
}
