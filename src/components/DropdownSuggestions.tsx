import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { SearchQueryResponse } from '../types'
import { Link } from 'react-router-dom'

const SEARCH_REPOSITORIES = gql`
    query RepositoriesQuery($query: String!) {
        rateLimit {
            limit
            cost
            remaining
            resetAt
        }
        search(query: $query, type: REPOSITORY, first: 10) {
            repositoryCount
            nodes {
                ... on Repository {
                    id
                    name
                    description
                    nameWithOwner
                    stargazerCount
                    owner {
                        avatarUrl
                    }
                }
            }
        }
    }
`

interface DropdownSuggestionsProps {
    query: string
}

const DropdownSuggestions: React.FC<DropdownSuggestionsProps> = ({ query }) => {
    const { loading, error, data } = useQuery<SearchQueryResponse>(
        SEARCH_REPOSITORIES,
        {
            variables: { query },
        }
    )

    if (loading && !data)
        return (
            <div className='h-6 w-6 animate-spin rounded-full border-4 border-bg-gray border-t-primary'></div>
        )
    if (error) {
        console.log(error)

        return (
            <p>
                Error {query}: {error.message}
            </p>
        )
    }
    if (!data || data.search.repositoryCount === 0) return <div>No matches</div>
    return (
        <div className='divide-y divide-text-gray/50 rounded-md border-2 border-text-gray/50'>
            {data.search.nodes.map((repo) => {
                return (
                    <Link
                        to={repo.nameWithOwner}
                        className='flex items-center gap-3 px-5 py-4 text-sm hover:bg-primary'
                    >
                        <img
                            className='block h-8 w-8 flex-shrink-0 rounded-full'
                            src={repo.owner.avatarUrl}
                            alt=''
                        />
                        <p>{repo.nameWithOwner}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default DropdownSuggestions
