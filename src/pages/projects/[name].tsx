import database from '@/firebase/rt_database/init';
import FormatRepoName from '@/helpers/FormatRepoName';
import RootLayout from '@/layouts/RootLayout';
import { GetRepositoryREADME } from '@/octokit/functions';
import { get, child, ref } from 'firebase/database';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import {
    GoLaw,
    GoRepoForked,
    GoLinkExternal,
    GoStar,
    GoEye,
    GoIssueOpened,
} from 'react-icons/go';
import remarkGfm from 'remark-gfm';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ProjectPageProps } from '@/types/props';

export default function ProjectPage({ name, project }: ProjectPageProps) {
    const [readme, setReadme] = useState<string | undefined>();

    async function FetchData() {
        const { data, error } = await GetRepositoryREADME(
            project?.owner?.login,
            name
        );

        if (error) {
            console.log(`${error.status}: ${error.message}`);
            return;
        }

        if (data) {
            setReadme(atob(data?.content));
        }
    }

    useEffect(() => {
        FetchData();
    }, [project]);

    return (
        <RootLayout>
            <div className="mt-12 mb-5">
                <h1 className="font-roboto font-bold text-3xl hover:text-blue-300 duration-200">
                    <a
                        href={project?.html_url}
                        target="_blank"
                        className="flex"
                    >
                        {name}
                        <GoLinkExternal size={12} />
                    </a>
                </h1>
                <p className="font-poppins text-sm hover:text-blue-300 hover:underline duration-200">
                    <a href={project?.owner?.html_url} target="_blank">
                        {project?.owner?.login}
                    </a>
                </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:justify-between mb-5">
                <p className="text-sm text-slate-400 flex items-center gap-2">
                    <GoLaw /> {project?.license?.name}
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-white bg-gray-800 p-2 rounded-md flex items-center gap-2">
                        <GoRepoForked />
                        {project?.forks_count}
                    </p>
                    <p className="text-sm text-white bg-gray-800 p-2 rounded-md flex items-center gap-2">
                        <GoStar />
                        {project?.stargazers_count}
                    </p>
                    <p className="text-sm text-white bg-gray-800 p-2 rounded-md flex items-center gap-2">
                        <GoEye />
                        {project?.watchers_count}
                    </p>
                </div>
            </div>
            <div>
                <div className="mb-5">
                    <h2 className="font-roboto font-bold text-xl mb-2">
                        Open Issues
                    </h2>
                    <p className="text-sm text-white bg-gray-800 p-2 rounded-md flex items-center gap-2 w-fit">
                        <GoIssueOpened />
                        {project?.open_issues}
                    </p>
                </div>
                <div>
                    <h3 className="font-roboto font-bold text-xl mb-2">
                        Topics
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                        {project?.topics?.map((topic: any, index: number) => (
                            <p
                                className="uppercase font-poppins font-medium"
                                key={index}
                            >
                                {topic}{' '}
                                {(index > 0 ||
                                    index < project?.topics?.length - 1) &&
                                    '|'}
                            </p>
                        ))}
                    </div>
                </div>
                <div id="readme">
                    {readme !== undefined ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {readme}
                        </ReactMarkdown>
                    ) : (
                        <p>Issue loading READme for {name}</p>
                    )}
                </div>
            </div>
        </RootLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params!;
    const name = params.name as string;

    const project = await get(
        child(ref(database), `projects/${name.toLowerCase()}`)
    )
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error('Project Error: ', error);
        });

    return {
        props: {
            name,
            project,
        },
    };
};
