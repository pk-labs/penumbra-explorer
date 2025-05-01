// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { IbcTable, IbcTableProps } from '@/components'
import { getIbcStats } from '@/lib/data'
import { TimePeriod } from '@/lib/types'

export interface Props extends Omit<IbcTableProps, 'stats'> {
    timePeriod?: TimePeriod
}

const IbcLoader: FC<Props> = async ({ timePeriod, ...props }) => {
    const stats = await getIbcStats(timePeriod)

    if (!stats) {
        notFound()
    }

    await new Promise(resolve => setTimeout(resolve, 3000))

    return <IbcTable stats={stats} {...props} />
}

export default IbcLoader
