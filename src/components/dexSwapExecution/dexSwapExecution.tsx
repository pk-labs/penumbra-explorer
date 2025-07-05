import { ArrowRightIcon } from 'lucide-react'
import { FC } from 'react'
import { TransformedDexSwapExecution } from '@/lib/types'
import { classNames } from '@/lib/utils'
import AssetValue from '../assetValue'
import Collapsible from '../collapsible'
import { Pill } from '../pills/pill'
import Skeleton from '../skeleton'
import DexExecutionRoute from './dexExecutionRoute'

interface Props extends TransformedDexSwapExecution {
    className?: string
}

const DexSwapExecution: FC<Props> = props => (
    <Collapsible
        className={classNames('font-mono text-xs font-medium', props.className)}
        header={
            <span
                className={classNames(
                    'scroll-area-component -mb-[7px] inline-flex items-center',
                    'justify-between gap-4 overflow-x-auto pb-[7px]'
                )}
            >
                <span className="flex items-center gap-1">
                    <AssetValue
                        amount={props.baseAmount}
                        assetId={props.baseAssetId}
                        density="slim"
                        fallback={
                            <Skeleton className="h-7 w-25 rounded-full" />
                        }
                    />
                    <ArrowRightIcon size={12} />
                    <AssetValue
                        amount={props.quoteAmount}
                        assetId={props.quoteAssetId}
                        density="slim"
                        fallback={
                            <Skeleton className="h-7 w-25 rounded-full" />
                        }
                    />
                </span>
                <span className="flex items-center gap-2">
                    {props.arb && (
                        <Pill compact>
                            <span className="text-xs">Arb</span>
                        </Pill>
                    )}
                    <span className="whitespace-nowrap">
                        {props.routes.length}{' '}
                        {props.routes.length === 1 ? 'swap' : 'swaps'}
                    </span>
                </span>
            </span>
        }
    >
        <div className="scroll-area-component -mb-6 flex flex-col gap-6 overflow-x-auto pb-6">
            {props.routes.map((hops, i) => (
                <DexExecutionRoute key={i} hops={hops} />
            ))}
        </div>
    </Collapsible>
)

export default DexSwapExecution
