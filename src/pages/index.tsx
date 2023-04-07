import Head from 'next/head';
import RootLayout from '@/layouts/RootLayout';
import { BsTwitter } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

export default function Home() {
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
                <section id="welcome" className="mb-32 pt-20">
                    <div id="heading" className="mb-6">
                        <h1 className="font-roboto font-bold uppercase text-xl">
                            Welcome To
                        </h1>
                        <h2 className="font-poppins font-bold text-5xl">
                            OceList
                        </h2>
                    </div>
                    <p className="font-poppins-light text-base w-3/4 leading-8">
                        OceList is your new one-stop shop for Open Source
                        projects! We provide a wide range of open source
                        projects of all kinds for you to view and start
                        collaborating on, as well as provide a free platform for
                        developers to list their very own open source projects
                        and get new collaborators! Start browsing now!
                    </p>
                </section>
                <section
                    id="why-ocelist"
                    className="relative -z-10 mb-32 py-20 text-white"
                >
                    <h3 className="font-poppins font-bold text-md mb-3 text-[40px]">
                        Why OceList?
                    </h3>
                    <p className="font-poppins text-base leading-8 w-3/4">
                        OceList is constantly being updated with new projects by
                        myself, the creator. With this, there will always be a
                        reliable source of popular open source projects for
                        users to select from.
                    </p>
                </section>
                <section id="find-contributors">
                    <h4 className="font-poppins font-bold text-md mb-3 text-[40px]">
                        Looking For Contributors?
                    </h4>
                    <p className="font-poppins text-sm leading-7 lg:text-base lg:leading-8 lg:w-3/4">
                        If you&apos;re looking for contributors for your Open
                        Source project, feel free to contact me with regards to
                        getting your project listed here on OceList! It&apos;s
                        completely free.
                    </p>
                    <div>
                        <h5 className="mb-3 mt-6 font-roboto text-lg font-bold">
                            Contact Information
                        </h5>
                        <div className="font-light flex flex-col gap-2">
                            <a
                                href="https://twitter.com/dev_rolle"
                                className="flex items-center gap-2"
                            >
                                <BsTwitter /> @dev_rolle
                            </a>
                            <p className="flex items-center gap-2">
                                <MdOutlineEmail /> sheltonrolle7@gmail.com
                            </p>
                        </div>
                    </div>
                </section>
            </RootLayout>
        </>
    );
}
