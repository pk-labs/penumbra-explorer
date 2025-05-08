// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { IbcTable, IbcTableProps } from '@/components'
import { getIbcStats } from '@/lib/data'

export type Props = Omit<IbcTableProps, 'stats'>

const IbcLoader: FC<Props> = async props => {
    const stats = await getIbcStats({ timePeriod: props.timePeriod })

    if (!stats) {
        notFound()
    }

    await new Promise(resolve => setTimeout(resolve, 3000))

    return <IbcTable stats={stats} {...props} />
}

export default IbcLoader
