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
                    repository {
                        createdAt
                        owner {
                            id
                            avatarUrl
                            login
                            url
                        }
                    }
                    ... on Commit {
                        history(first: 100, after: $after) {
                            totalCount
                            edges {
                                node {
                                    ... on Commit {
                                        committedDate
                                        authoredDate
                                        message
                                        messageBody
                                        messageBodyHTML
                                        messageHeadline
                                        messageHeadlineHTML
                                        committer {
                                            user {
                                                url
                                                avatarUrl
                                                name
                                                login
                                            }
                                        }
                                        pushedDate
                                        deletions
                                        additions
                                        id
                                        url
                                        commitUrl
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
