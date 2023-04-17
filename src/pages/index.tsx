import Head from 'next/head';
import RootLayout from '@/layouts/RootLayout';
import { GetServerSideProps } from 'next';
import database from '@/firebase/rt_database/init';
import { get, ref } from 'firebase/database';
import ProjectCard from '@/components/ProjectCard';
import { inter, poppins } from '../fonts';
import { Footer } from '@/components/Footer';
import { HomePageProps } from '@/types/props';

export default function Home({ highlightedProjects }: HomePageProps) {
    async function Translate(text: string, languageCode: string) {
        let translation: { translatedText: string } | undefined;

        const data = {
            text,
            languageCode,
        };

        await fetch(
            'http://localhost:3000/api/translate?' + new URLSearchParams(data)
        )
            .then((res) => res.json())
            .then((res) => {
                translation = res;
            })
            .catch((error) => {
                console.log(`${error.code} - ${error.message}`);
                translation = undefined;
            });

        return translation?.translatedText;
    }

    return (
        <>
            <Head>
                <title>OceList</title>
                <meta name="description" content="OceList landing page." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <RootLayout>
                <section id="hero" className="mb-20">
                    <h1
                        className={`text-xs lg:text-base font-bold ${inter.className}`}
                    >
                        Welcome To
                    </h1>
                    <h2
                        className={`text-3xl lg:text-5xl font-bold mb-6 ${inter.className}`}
                    >
                        OceList
                    </h2>
                    <p
                        className={`text-sm lg:text-base leading-7 lg:leading-9 ${poppins.className}`}
                    >
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
                <section
                    id="highlighted-projects"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                >
                    <h3
                        className={`font-bold text-xl mb-8 ${inter.className} md:col-span-2 lg:col-span-3`}
                    >
                        Highlighted Project
                    </h3>
                    {highlightedProjects.map((project, index) => (
                        <ProjectCard project={project} key={index} />
                    ))}
                </section>
                <section id="recommendations" className="relative py-4 lg:py-6">
                    <div className="max-w-xl mx-auto">
                        <h4
                            className={`font-bold text-xl mb-3 ${inter.className}`}
                        >
                            Have a repo in mind?
                        </h4>
                        <p className={`text-sm ${poppins.className}`}>
                            If you have a repository you’d like to see listed,
                            whether it’s one you enjoy or your very own
                            repository, feel free to contact me using any of the
                            contact methods listed below. I’m always looking for
                            great projects to add to the platform, and its
                            completely free!
                        </p>
                        <div id="contacts" className="flex gap-6 mt-7">
                            <div>
                                <p className={`text-xs ${poppins.className}`}>
                                    Twitter
                                </p>
                                <p>@dev_rolle</p>
                            </div>
                            <div>
                                <p className={`text-xs ${poppins.className}`}>
                                    Email
                                </p>
                                <p>contact.support@ocelist.com</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
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
        !highlightedProjects.includes(
            highlightedProjects.push(projects[index])
        );
    }

    return {
        props: {
            highlightedProjects,
        },
    };
};
