import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getRepo } from '@/utils/getRepo'
import Graph from '@/components/Graph'

export const getServerSideProps: GetServerSideProps<
    Awaited<ReturnType<typeof getRepo>>
> = async (ctx) => {
    const { name, login } = ctx.query

    const data = await getRepo(name as string, login as string)
    return { props: data }
}

const Repository: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ message, stuff, totalCount, time }) => {
    const router = useRouter()
    const { login, name } = router.query

    if (message)
        return (
            <div className='mx-auto w-max'>
                {JSON.stringify(message)}
                <Spinner />
            </div>
        )

    let c = 0
    const commits = stuff?.reverse()

    const labels = commits?.map((commit) => commit?.node?.committedDate)

    const data = {
        labels,
        datasets: [
            {
                data: commits?.map((commit) => {
                    c +=
                        (commit?.node?.additions || 0) -
                        (commit?.node?.deletions || 0)

                    return c
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    return (
        <>
            <h1 className='text-3xl font-black'>
                {totalCount} - {time} - {c}
            </h1>
            <Graph height={300} width={300} />
        </>
    )
}

export default Repository
