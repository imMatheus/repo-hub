import React from 'react'
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { RepoQueryResponse } from '@/types'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import { gql } from '@/__generated__/gql'
import { GET_REPOSITORY } from '@/graphql/GET_REPOSITORY'

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
        (a, b) => a + ((b?.node?.additions || 0) - (b?.node?.deletions || 0)),
        0
    )
    const arr = commits?.map((commit) => ({
        add: commit?.node?.additions,
        del: commit?.node?.deletions,
        diff: (commit?.node?.additions || 0) - (commit?.node?.deletions || 0),
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
