import { client } from '@/apollo'
import { GET_REPOSITORY } from '@/graphql/GET_REPOSITORY'
import { ApolloQueryResult } from '@apollo/client'
import { GetRepositoryQuery } from '@/__generated__/graphql'

export async function getRepo(name: string, login: string) {
    if (!login || !name)
        return {
            message: 'Could not find repo',
        }

    const time = new Date()

    const { data } = await client.query({
        query: GET_REPOSITORY,
        variables: {
            name: name,
            login: login,
        },
    })
    const target = data.repository?.defaultBranchRef?.target

    if (!target || !('history' in target) || !target.history.edges)
        return { message: 'Could not find repo' }

    let rounds = 0
    const commits: any[] = []
    const totalCount = target.history.totalCount
    const requests: Promise<ApolloQueryResult<GetRepositoryQuery>>[] = []

    for (let i = 0; i < totalCount + 100; i += 100) {
        requests.push(
            client.query({
                query: GET_REPOSITORY,
                variables: {
                    name: name as string,
                    login: login as string,
                    after: i !== 0 ? `${target.oid} ${i - 1}` : null,
                },
            })
        )
    }

    const stuff = await Promise.all(requests)
    const goodStuff = stuff
        .map(({ data }) =>
            data.repository?.defaultBranchRef?.target
                ? 'history' in data.repository?.defaultBranchRef?.target
                    ? data.repository?.defaultBranchRef?.target?.history.edges
                    : ''
                : ''
        )
        .flat()
    const newTime = new Date()
    return {
        rounds,
        time: newTime.getTime() - time.getTime(),
        totalCount,
        commitsCount: commits.length,
        stuff: goodStuff,
        repo: target.repository,
        // commits: commits,
    }
}
