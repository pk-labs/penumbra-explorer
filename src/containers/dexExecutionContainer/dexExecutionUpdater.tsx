// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { DexExecution, EmptyState } from '@/components'
import { TransformedDexExecution } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props as DexPositionTableContainerProps } from './dexExecutionContainer'

interface Props extends DexPositionTableContainerProps {
    executions?: TransformedDexExecution[]
}

const DexExecutionUpdater: FC<Props> = props => {
    const [executions] = useState(props.executions)

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-10 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <h2 className="text-2xl font-medium">Latest executions</h2>
            {executions?.length ? (
                executions.map((execution, i) => (
                    <DexExecution key={i} {...execution} />
                ))
            ) : (
                <EmptyState title="No executions" />
            )}
        </section>
    )
}

export default DexExecutionUpdater
