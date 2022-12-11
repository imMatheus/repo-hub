import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getRepo } from '@/utils/getRepo'

export const getServerSideProps: GetServerSideProps<
    Awaited<ReturnType<typeof getRepo>>
> = async (ctx) => {
    const { name, login } = ctx.query

    const data = await getRepo(name as string, login as string)
    return { props: data }
}

const Repository: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ message, commitsCount, stuff }) => {
    const router = useRouter()
    const { login, name } = router.query

    if (message)
        return (
            <div className='mx-auto w-max'>
                {JSON.stringify(message)}
                <Spinner />
            </div>
        )

    return (
        <>
            <pre>{JSON.stringify(stuff, null, 2)}</pre>
        </>
    )
}

export default Repository
