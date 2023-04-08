import ProjectCard from '@/components/ProjectCard';
import database from '@/firebase/rt_database/init';
import RootLayout from '@/layouts/RootLayout';
import { get, ref } from 'firebase/database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface BrowsePageProps {
    projects: any[];
}

export default function BrowsePage({ projects }: BrowsePageProps) {
    const [results, setResults] = useState<any[]>();
    const [searchQuery, setSearchQuery] = useState<string | undefined>();

    useEffect(() => {
        if (searchQuery === '' || searchQuery === undefined) {
            setResults(projects);
            return;
        }
        const matches = [];

        for (let i = 0; i < projects.length; i++) {
            if (projects[i]?.name.includes(searchQuery))
                matches.push(projects[i]);
        }

        setResults(matches);
    }, [searchQuery]);

    return (
        <>
            <Head>
                <title>Browse</title>
                <meta
                    name="description"
                    content="Browse a collection of Open Source projects."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <RootLayout>
                <label className="w-full max-w-md font-roboto font-bold text-xs lowercase flex flex-col gap-1 lg:text-base">
                    Search
                    <input
                        type="text"
                        placeholder="Search"
                        className="font-poppins font-normal text-sm border-2 border-black rounded-md px-3 py-2 lg:text-lg"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
                <div className="flex flex-col gap-1 my-5 border-l-4 border-ocGray px-4 py-4 bg-slate-100 w-fit rounded-md">
                    <h1 className="font-roboto font-medium text-base">
                        Are we missing a project you think we should have
                        listed?
                    </h1>
                    <p className="font-poppins font-light text-sm">
                        Contact me @dev_rolle on Twitter <strong>OR</strong> by
                        email contact.support@ocelist.com and let me know.
                    </p>
                </div>
                <div
                    id="project-grid"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                >
                    {results?.map((project, index) => (
                        <ProjectCard project={project} key={index} />
                    ))}
                </div>
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
