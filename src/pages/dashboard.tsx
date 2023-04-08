import Dashboard from '@/components/Dashboard';
import DashboardLogin from '@/components/DashboardLogin';
import auth from '@/firebase/auth/init';
import database from '@/firebase/rt_database/init';
import RootLayout from '@/layouts/RootLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

interface DashboardPageProps {
    projects: any[];
}

export default function DashboardPage({ projects }: DashboardPageProps) {
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
                <>
                    {isLoggedIn ? (
                        <Dashboard projects={projects} />
                    ) : (
                        <DashboardLogin />
                    )}
                </>
            )}
        </RootLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const projects = await get(ref(database, '/projects'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.error(`${error.code} - ${error.message}`);
        });

    return {
        props: {
            projects,
        },
    };
};
