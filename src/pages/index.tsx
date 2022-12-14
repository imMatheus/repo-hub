import Head from 'next/head'
import RepositoryGraph from '@/components/RepositoryGraph'
import SearchBar from '@/components/SearchBar'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {process.env.NEXT_PUBLIC_GITHUB_TOKEN}
            <SearchBar />
            <RepositoryGraph />
        </div>
    )
}
