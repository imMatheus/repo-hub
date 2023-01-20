import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { SearchQueryResponse } from '../types'
import Link from 'next/link'
import Spinner from '@/components/Spinner'

interface DropdownSuggestionsProps {
    query: string
}

const DropdownSuggestions: React.FC<DropdownSuggestionsProps> = ({ query }) => {
    const [loading, setLoading] = useState(true)
    const [repos, setRepos] = useState<any[]>([])

    useEffect(() => {
        async function getRepos() {
            const res = await fetch(
                'https://api.github.com/search/repositories?q=' + query
            )
            const data = await res.json()
            console.log(data)
            setRepos(data.items)
        }

        getRepos()
    }, [query])

    if (loading && repos.length < 1) return <Spinner />
    // if (error) {
    //     console.log(error)

    //     return (
    //         <p>
    //             Error {query}: {error.message}
    //         </p>
    //     )
    // }
    // if (!data || data.search.repositoryCount === 0) return <div>No matches</div>
    return (
        <div className='divide-y divide-text-gray/50 rounded-md border-2 border-text-gray/50'>
            {/* {repos?.map((repo) => {
                return (
                    <Link
                        key={repo.id}
                        href={repo.id}
                        className='flex items-center gap-3 px-5 py-4 text-sm hover:bg-primary'
                    >
                        <img
                            className='block h-8 w-8 flex-shrink-0 rounded-full'
                            src={repo.owner.avatarUrl}
                            alt=''
                        />
                        <p>{repo.full_name}</p>
                    </Link>
                )
            })} */}
        </div>
    )
}

export default DropdownSuggestions
