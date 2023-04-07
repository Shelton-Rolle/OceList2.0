import Dashboard from '@/components/Dashboard';
import DashboardLogin from '@/components/DashboardLogin';
import auth from '@/firebase/auth/init';
import database from '@/firebase/rt_database/init';
import RootLayout from '@/layouts/RootLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export interface DashboardProps {
    projects: any[];
    error: string | null;
}

export default function DashboardPage({ projects, error }: DashboardProps) {
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
                        <Dashboard projects={projects} error={error} />
                    ) : (
                        <DashboardLogin />
                    )}
                </>
            )}
        </RootLayout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    let error: string | null = null;
    const projects = await get(ref(database, '/projects'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            } else {
                return [];
            }
        })
        .catch((error) => {
            error = `${error.code} - ${error.message}`;
        });

    return {
        props: {
            projects,
            error,
        },
    };
};
