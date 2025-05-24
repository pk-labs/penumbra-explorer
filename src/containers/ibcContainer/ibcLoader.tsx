// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { IbcTable } from '@/components'
import { getIbcStats } from '@/lib/data'
import { Props } from './ibcContainer'

const IbcLoader: FC<Props> = async props => {
    const stats = await getIbcStats({ timePeriod: props.timePeriod })

    if (!stats) {
        notFound()
    }

    return <IbcTable stats={stats} {...props} />
}

export default IbcLoader
