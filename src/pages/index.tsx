import Head from 'next/head';
import RootLayout from '@/layouts/RootLayout';
import { GetServerSideProps } from 'next';
import database from '@/firebase/rt_database/init';
import { get, ref } from 'firebase/database';
interface HomePageProps {
    highlightedProjects: any[];
}

export default function Home({ highlightedProjects }: HomePageProps) {
    console.log('Highlighted Projects: ', highlightedProjects);
    return (
        <>
            <Head>
                <title>OceList</title>
                <meta
                    name="description"
                    content="Landing page to introduce the user to the platform."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <RootLayout>
                <section id="hero">
                    <h1>Welcome To</h1>
                    <h2>OceList</h2>
                    <p>
                        OceList is a platform with one purpose, to provide
                        developers with an easier way of discovering Open Source
                        repositories to contribute to. OceList has an ever
                        growing collection of Open Source repositories ranging
                        from ones owned by huge corporations, to smaller
                        repositories created by solo developers. OceList gives
                        you a place where you can easily find projects that fit
                        your interests and start contributing.
                    </p>
                </section>
                <section id="highlighted-projects">
                    {/* Display a list of a few highlighted projects */}
                </section>
                <section id="recommendations">
                    <div>
                        <h3>Have a repo in mind?</h3>
                        <p>
                            If you have a repository you’d like to see listed,
                            whether it’s one you enjoy or your very own
                            repository, feel free to contact me using any of the
                            contact methods listed below. I’m always looking for
                            great projects to add to the platform, and its
                            completely free!
                        </p>
                        <div id="contacts">
                            <div>
                                <p>Twitter</p>
                                <p>@dev_rolle</p>
                            </div>
                            <div>
                                <p>Email</p>
                                <p>contact.support@ocelist.com</p>
                            </div>
                        </div>
                    </div>
                </section>
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
            return [];
        });

    const highlightedProjects: any[] = [];

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * projects.length);
        if (
            !highlightedProjects.includes(
                highlightedProjects.push(projects[index])
            )
        ) {
            highlightedProjects.push(projects[index]);
        }
    }

    return {
        props: {
            highlightedProjects,
        },
    };
};
