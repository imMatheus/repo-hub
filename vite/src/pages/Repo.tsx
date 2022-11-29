import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { RepoQueryResponse } from '../types'

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

const Repo: React.FC = ({}) => {
    const { login, name } = useParams()

    const { loading, error, data, fetchMore } = useQuery(SEARCH_REPOSITORIES, {
        variables: { login, name },
    })

    console.log(error)

    if (loading) return <p>loading...</p>

    if (error) return <p>error</p>
    return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Repo
