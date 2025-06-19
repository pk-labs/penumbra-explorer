import { FC, Fragment } from 'react'
import { DexExecutionHop } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'

interface Props {
    hops: DexExecutionHop[]
}

const DexExecutionRoute: FC<Props> = props => {
    const separator = (
        <span className="border-t-other-tonalStroke min-w-4 flex-1 border-t-1" />
    )

    if (props.hops.length > 3) {
        const firstHop = props.hops[0]
        const collapsedHops = props.hops.length - 2
        const lastHop = props.hops[props.hops.length - 1]

        return (
            <div className="flex items-center">
                <span className="flex flex-1 items-center">
                    <span
                        className={classNames(
                            'bg-other-tonalFill10 rounded-full px-2 py-1',
                            'whitespace-nowrap'
                        )}
                    >
                        {formatNumber(firstHop.amount)} {firstHop.currency}
                    </span>
                    {separator}
                </span>
                <span
                    className={classNames(
                        'bg-other-tonalFill10 rounded-full px-2 py-1',
                        'whitespace-nowrap'
                    )}
                >
                    +{collapsedHops}
                </span>
                <span className="flex flex-1 items-center">
                    {separator}
                    <span
                        className={classNames(
                            'bg-other-tonalFill10 rounded-full px-2 py-1',
                            'whitespace-nowrap'
                        )}
                    >
                        {formatNumber(lastHop.amount)} {lastHop.currency}
                    </span>
                </span>
            </div>
        )
    }

    const lastIndex = props.hops.length - 1

    return (
        <div className="flex items-center">
            {props.hops.map((hop, i) => (
                <Fragment key={i}>
                    <span
                        className={classNames(
                            'bg-other-tonalFill10 rounded-full px-2 py-1',
                            'whitespace-nowrap'
                        )}
                    >
                        {formatNumber(hop.amount)} {hop.currency}
                    </span>
                    {i !== lastIndex && separator}
                </Fragment>
            ))}
        </div>
    )
}

export default DexExecutionRoute
