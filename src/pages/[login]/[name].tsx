import React from 'react'
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { RepoQueryResponse } from '@/types'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import { gql } from '../../__generated__/gql'

const GET_REPOSITORY = gql(/* GraphQL */ `
    query GetRepository($login: String!, $name: String!) {
        rateLimit {
            limit
            remaining
            resetAt
            cost
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
`)
const Repository: NextPage = () => {
    const router = useRouter()
    const { login, name } = router.query
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        variables: { login: login as string, name: name as string },
    })

    if (loading)
        return (
            <div className='mx-auto w-max'>
                <Spinner />
            </div>
        )

    const target = data?.repository?.defaultBranchRef?.target
    if (error || !data || !target)
        return <div className='mx-auto w-max'>error</div>

    const commits = 'history' in target ? target.history.edges : null
    const count = commits?.reduce(
        (a, b) => a + (b?.node?.additions - b?.node?.deletions),
        0
    )
    const arr = commits?.map((commit) => ({
        add: commit?.node?.additions,
        del: commit?.node?.deletions,
        diff: commit?.node?.additions - commit?.node?.deletions,
    }))

    console.table(arr)

    return (
        <>
            <pre>{JSON.stringify(count, null, 2)}</pre>
            <pre>{JSON.stringify(arr, null, 2)}</pre>
        </>
    )
}

export default Repository
