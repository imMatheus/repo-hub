import Head from 'next/head'
import RepositoryGraph from '@/components/RepositoryGraph'
import SearchBar from '@/components/SearchBar'

export default function Home() {
    return (
        <div>
            {process.env.NEXT_PUBLIC_GITHUB_TOKEN}
            <SearchBar />
            <RepositoryGraph />
        </div>
    )
}
