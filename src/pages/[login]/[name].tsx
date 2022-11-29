import React from 'react'
import type { NextPage } from 'next'
import { useQuery, gql } from '@apollo/client'
import { RepoQueryResponse } from '@/types'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'

const SEARCH_REPOSITORIES = gql`
    query RepositoriesQuery($login: String!, $name: String!) {
        rateLimit {
            limit
            cost
            remaining
            resetAt
        }
        repository(name: $name, owner: $login) {
            defaultBranchRef {
                target {
                    ... on Commit {
                        history(first: 100) {
                            totalCount
                            edges {
                                node {
                                    ... on Commit {
                                        committedDate
                                        deletions
                                        additions
                                        id
                                    }
                                }
                                cursor
                            }
                        }
                    }
                }
            }
        }
    }
`
const Repository: NextPage = () => {
    const router = useRouter()
    const { login, name } = router.query
    const { loading, error, data } = useQuery<RepoQueryResponse>(
        SEARCH_REPOSITORIES,
        {
            variables: { login, name },
        }
    )

    if (loading)
        return (
            <div className='mx-auto w-max'>
                <Spinner />
            </div>
        )

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Repository
