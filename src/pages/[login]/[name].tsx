import React from 'react'
import type { NextPage } from 'next'
import { useQuery, gql } from '@apollo/client'
import { RepoQueryResponse } from '@/types'

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
    return <div>repo</div>
}

export default Repository
