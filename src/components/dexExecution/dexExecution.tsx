import { ArrowRightIcon } from 'lucide-react'
import { FC } from 'react'
import { TransformedDexExecution } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import Collapsible from '../collapsible'

interface Props extends TransformedDexExecution {
    className?: string
}

const DexExecution: FC<Props> = props => (
    <Collapsible
        className={classNames('font-mono text-xs font-medium', props.className)}
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
    />
)

export default DexExecution
