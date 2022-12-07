// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/apollo'
import { GET_REPOSITORY } from '@/graphql/GET_REPOSITORY'
import { ApolloQueryResult } from '@apollo/client'
import { GetRepositoryQuery } from '@/__generated__/graphql'

type Data = {
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query)

    if (!req.query.login || !req.query.name)
        return res.status(400).json({
            message: 'Could not find repo',
        })

    const time = new Date()

    const { data } = await client.query({
        query: GET_REPOSITORY,
        variables: {
            name: req.query.name as string,
            login: req.query.login as string,
        },
    })
    const target = data.repository?.defaultBranchRef?.target

    if (!target || !('history' in target) || !target.history.edges)
        return res.status(400).json({ message: 'Something went wrong' })

    let rounds = 0
    const commits: any[] = []
    const totalCount = target.history.totalCount
    const requests: Promise<ApolloQueryResult<GetRepositoryQuery>>[] = []

    for (let i = 0; i < totalCount + 100; i += 100) {
        const lastCommit = commits[commits.length - 1]

        requests.push(
            client.query({
                query: GET_REPOSITORY,
                variables: {
                    name: req.query.name as string,
                    login: req.query.login as string,
                    after: i !== 0 ? `${target.oid} ${i - 1}` : null,
                },
            })
        )

        // const { data: paginationData } = await client.query({
        //     query: GET_REPOSITORY,
        //     variables: {
        //         name: req.query.name as string,
        //         login: req.query.login as string,
        //         after: lastCommit?.cursor,
        //     },
        // })

        // const paginationTarget =
        //     paginationData.repository?.defaultBranchRef?.target
        // if (
        //     paginationTarget &&
        //     'history' in paginationTarget &&
        //     paginationTarget.history.edges
        // ) {
        //     rounds++
        //     const paginationCommits = paginationTarget.history.edges
        //     console.log(paginationCommits[0])

        //     commits.push(...JSON.parse(JSON.stringify(paginationCommits)))
        // }
    }

    const stuff = await Promise.all(requests)
    const goodStuff = stuff
        .map(({ data }) =>
            'history' in data.repository?.defaultBranchRef?.target
                ? data.repository?.defaultBranchRef?.target?.history.edges
                : ''
        )
        .flat()
    const newTime = new Date()
    return res.status(200).json({
        rounds,
        time: newTime.getTime() - time.getTime(),
        totalCount,
        commitsCount: commits.length,
        stuff: goodStuff,
        // commits: commits,
    })
}
