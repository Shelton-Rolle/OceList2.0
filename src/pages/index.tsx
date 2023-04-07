import RootLayout from '@/layouts/RootLayout';
import Head from 'next/head';

export default function Home() {
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
                <h1>Hello World</h1>
            </RootLayout>
        </>
    );
}
