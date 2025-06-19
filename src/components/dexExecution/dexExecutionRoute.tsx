import { FC, Fragment } from 'react'
import { DexExecutionHop } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'

interface Props {
    hops: DexExecutionHop[]
}

const DexExecutionRoute: FC<Props> = props => {
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
                    {i !== lastIndex && (
                        <span
                            className={classNames(
                                'border-t-other-tonalStroke min-w-8 flex-1',
                                'border-t-1'
                            )}
                        />
                    )}
                </Fragment>
            ))}
        </div>
    )
}

export default DexExecutionRoute
