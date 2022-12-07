import { gql } from '@/__generated__/gql'

export const GET_REPOSITORY = gql(/* GraphQL */ `
    query GetRepository($login: String!, $name: String!, $after: String) {
        rateLimit {
            limit
            remaining
            resetAt
            cost
        }
        repository(name: $name, owner: $login) {
            defaultBranchRef {
                target {
                    id
                    oid
                    ... on Commit {
                        history(first: 100, after: $after) {
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
`)
