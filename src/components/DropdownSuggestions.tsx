import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { SearchQueryResponse } from '../types'

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

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error)

        return (
            <p>
                Error {query}: {error.message}
            </p>
        )
    }
    if (!data) return <div>No matches</div>
    return (
        <div className='divide-y divide-text-gray/50 rounded-md border-2 border-text-gray/50'>
            {data.search.nodes.map((repo) => {
                return <div className='p-5'>{repo.name}</div>
            })}
        </div>
    )
}

export default DropdownSuggestions
