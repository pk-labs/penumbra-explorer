import { ArrowRightIcon } from 'lucide-react'
import { FC } from 'react'
import { TransformedDexExecution } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import Collapsible from '../collapsible'
import DexExecutionRoute from './dexExecutionRoute'

interface Props extends TransformedDexExecution {
    className?: string
}

const DexExecution: FC<Props> = props => (
    <Collapsible
        className={classNames('font-mono text-xs font-medium', props.className)}
        contentClassName="flex flex-col gap-6 overflow-x-auto"
        header={
            <>
                <span className="flex items-center gap-1">
                    {formatNumber(props.baseAmount)} {props.base}
                    <ArrowRightIcon size={12} />
                    {formatNumber(props.quoteAmount)} {props.quote}
                </span>
                <span>
                    {props.swaps.length}{' '}
                    {props.swaps.length === 1 ? 'swap' : 'swaps'}
                </span>
            </>
        }
        headerClassName="justify-between"
    >
        {props.swaps.map((hops, i) => (
            <DexExecutionRoute key={i} hops={hops} />
        ))}
    </Collapsible>
)

export default DexExecution
