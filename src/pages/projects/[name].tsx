import database from '@/firebase/rt_database/init';
import FormatRepoName from '@/helpers/FormatRepoName';
import RootLayout from '@/layouts/RootLayout';
import { get, child, ref } from 'firebase/database';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ProjectPageProps {
    name: string;
    project: any;
}

export default function ProjectPage({ name, project }: ProjectPageProps) {
    console.log('Project Name: ', name);
    console.log('Project: ', project);
    return (
        <RootLayout>
            <h1>Project Page</h1>
        </RootLayout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const projects = await get(child(ref(database), '/projects'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            } else {
                return [];
            }
        })
        .catch((error) => {
            return [];
        });

    const paths = projects?.map((project: any) => ({
        params: { name: FormatRepoName(project?.name) },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const name = params?.name;

    const project = await get(child(ref(database), `projects/${name}`))
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
