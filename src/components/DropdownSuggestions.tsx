import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Repo } from '@/types'
import Link from 'next/link'
import Spinner from '@/components/Spinner'

interface DropdownSuggestionsProps {
    query: string
}

const DropdownSuggestions: React.FC<DropdownSuggestionsProps> = ({ query }) => {
    const [loading, setLoading] = useState(true)
    const [repos, setRepos] = useState<Repo[]>([])

    useEffect(() => {
        async function getRepos() {
            setLoading(true)
            const res = await fetch(
                'https://api.github.com/search/repositories?q=' + query
            )

            interface Data {
                total_count: number
                incomplete_results: false
                items: Repo[]
            }

            const data: Data = await res.json()
            console.log(data)
            setRepos(data.items)
            setLoading(false)
        }

        getRepos()
    }, [query])

    console.log(repos)

    if (loading && repos.length < 1) return <Spinner />

    if (repos.length === 0) return <div>No matches</div>
    return (
        <div className='max-h-[450px] divide-y divide-text-gray/50 overflow-y-scroll rounded-md border-2 border-text-gray/50'>
            {repos?.map((repo) => {
                return (
                    <Link
                        key={repo.id}
                        href={`/${repo.owner.login}/${repo.name}`}
                        className='flex items-center gap-3 px-5 py-4 text-sm hover:bg-primary'
                    >
                        <img
                            className='block h-8 w-8 flex-shrink-0 rounded-full'
                            src={repo.owner.avatar_url}
                            alt=''
                        />
                        <p>{repo.full_name}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default DropdownSuggestions
