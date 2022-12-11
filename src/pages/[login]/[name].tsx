import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getRepo } from '@/utils/getRepo'
import { VictoryChart, VictoryLine } from 'victory'

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
    const l = stuff?.reverse().map((a, i) => {
        c += (a?.node?.additions || 0) - (a?.node?.deletions || 0)
        return { x: a?.node?.pushedDate, y: c }
    })

    return (
        <>
            <h1 className='text-3xl font-black'>
                {totalCount} - {time} - {c}
            </h1>
            <VictoryChart>
                <VictoryLine
                    style={{
                        data: { stroke: '#26f' },
                        parent: { border: '1px solid #ccc', stroke: '#26f' },
                    }}
                    data={l}
                />
            </VictoryChart>
        </>
    )
}

export default Repository
