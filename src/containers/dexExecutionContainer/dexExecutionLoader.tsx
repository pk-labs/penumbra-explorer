// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { DexBlockExecution, EmptyState } from '@/components'
import { getDexBlockExecutions } from '@/lib/data'
import { classNames } from '@/lib/utils'
import { Props } from './dexExecutionContainer'

const DexExecutionLoader: FC<Props> = async props => {
    const blockExecutions = await getDexBlockExecutions()

    if (!blockExecutions) {
        notFound()
    }

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-10 rounded-lg p-6',
                'backdrop-blur-lg lg:overflow-y-hidden',
                props.className
            )}
        >
            <h2 className="text-2xl font-medium">Latest executions</h2>
            {blockExecutions.length ? (
                <ul
                    className={classNames(
                        'flex flex-col gap-10 lg:h-[1064px] lg:overflow-y-auto'
                    )}
                >
                    {blockExecutions.map(blockExecution => (
                        <li key={blockExecution.height}>
                            <DexBlockExecution {...blockExecution} />
                        </li>
                    ))}
                </ul>
            ) : (
                <EmptyState title="No executions" />
            )}
        </section>
    )
}

export default DexExecutionLoader
