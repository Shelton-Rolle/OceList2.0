import ProjectCard from '@/components/ProjectCard';
import database from '@/firebase/rt_database/init';
import RootLayout from '@/layouts/RootLayout';
import { get, ref } from 'firebase/database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface BrowsePageProps {
    projects: any[];
}

export default function BrowsePage({ projects }: BrowsePageProps) {
    console.log('Projects: ', projects);
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Home page for OceList." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RootLayout>
                <h1>Browse Page</h1>
                {projects?.map((project, index) => (
                    <ProjectCard project={project} key={index} />
                ))}
            </RootLayout>
        </>
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
