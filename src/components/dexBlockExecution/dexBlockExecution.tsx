import { FC } from 'react'
import { TransformedDexExecution } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import DexExecution from '../dexExecution'
import TimeAgo from '../timeAgo'

interface Props {
    className?: string
    executions: TransformedDexExecution[]
    height: number
    timestamp: number
}

const DexBlockExecution: FC<Props> = props => (
    <section className={classNames('flex flex-col gap-2', props.className)}>
        <header
            className={classNames(
                'flex items-center justify-between px-4 font-mono text-sm',
                'font-medium'
            )}
        >
            <span>Block {formatNumber(props.height)}</span>
            <TimeAgo timestamp={props.timestamp} />
        </header>
        <div>
            {props.executions.map(execution => (
                <DexExecution
                    key={execution.id}
                    {...execution}
                    className={classNames(
                        'not-last:not-only:border-b-other-tonalStroke',
                        'not-first:not-last:rounded-none',
                        'not-last:not-only:border-b-1',
                        'first:not-only:rounded-b-none',
                        'last:not-only:rounded-t-none'
                    )}
                />
            ))}
        </div>
    </section>
)

export default DexBlockExecution
