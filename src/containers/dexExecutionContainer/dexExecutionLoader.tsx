// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getDexBlockExecutions } from '@/lib/data'
import { Props } from './dexExecutionContainer'
import DexExecutionSection from './dexExecutionSection'

const DexExecutionLoader: FC<Props> = async props => {
    const blockExecutions = await getDexBlockExecutions()

    if (!blockExecutions) {
        notFound()
    }

    return <DexExecutionSection {...props} blockExecutions={blockExecutions} />
}

export default DexExecutionLoader
