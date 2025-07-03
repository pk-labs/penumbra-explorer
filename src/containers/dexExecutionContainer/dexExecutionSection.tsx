// istanbul ignore file
'use client'

import { FC, useCallback, useState } from 'react'
import { Button, DexBlockExecution, EmptyState } from '@/components'
import { TransformedDexBlockExecution } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props as DexExecutionContainerProps } from './dexExecutionContainer'

interface Props extends DexExecutionContainerProps {
    blockExecutions: TransformedDexBlockExecution[]
}

const DexExecutionSection: FC<Props> = props => {
    const [maximized, setMaximized] = useState(false)

    const toggleMaximized = useCallback(() => setMaximized(prev => !prev), [])

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 scroll-area-component flex flex-col',
                'gap-10 rounded-lg p-6 backdrop-blur-lg lg:overflow-y-hidden',
                maximized ? 'lg:w-3/4' : 'lg:w-[550px]',
                props.className
            )}
        >
            <div className="flex justify-between gap-2">
                <h2 className="text-2xl font-medium">Latest executions</h2>
                <Button
                    className="hidden lg:block"
                    density="compact"
                    icon={maximized ? 'Minimize' : 'Maximize'}
                    onClick={toggleMaximized}
                    priority="secondary"
                    iconOnly
                >
                    {maximized ? 'Minimize' : 'Maximize'}
                </Button>
            </div>
            {props.blockExecutions.length ? (
                <ul
                    className={classNames(
                        'scroll-area-component -mr-6 flex flex-col gap-10 pr-6',
                        'lg:h-[1160px] lg:overflow-y-auto'
                    )}
                >
                    {props.blockExecutions.map(blockExecution => (
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

export default DexExecutionSection
