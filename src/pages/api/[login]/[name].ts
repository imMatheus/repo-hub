import type { NextApiRequest, NextApiResponse } from 'next'
import { getRepo } from '@/utils/getRepo'

type Data = Awaited<ReturnType<typeof getRepo>>

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (!req.query.login || !req.query.name)
        return res.status(400).json({
            message: 'Could not find repo',
        })

    const data = await getRepo(
        req.query.name as string,
        req.query.login as string
    )
    if (data.message) {
        return res.status(400).json({ message: data.message })
    }

    return res.status(200).json(data)
}
