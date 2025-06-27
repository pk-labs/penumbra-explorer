import { ArrowRightIcon } from 'lucide-react'
import { FC } from 'react'
import { TransformedDexSwapExecution } from '@/lib/types'
import { classNames } from '@/lib/utils'
import AssetValue from '../assetValue'
import Collapsible from '../collapsible'
import { Pill } from '../pill'
import DexExecutionRoute from './dexExecutionRoute'

interface Props extends TransformedDexSwapExecution {
    className?: string
}

const DexSwapExecution: FC<Props> = props => (
    <Collapsible
        className={classNames('font-mono text-xs font-medium', props.className)}
        header={
            <>
                <span className="flex items-center gap-1">
                    <AssetValue
                        amount={props.baseAmount}
                        assetId={props.baseAssetId}
                        density="slim"
                    />
                    <ArrowRightIcon size={12} />
                    <AssetValue
                        amount={props.quoteAmount}
                        assetId={props.quoteAssetId}
                        density="slim"
                    />
                </span>
                <span className="flex items-center gap-2">
                    {props.arb && (
                        <Pill context="technical-default">
                            <span className="text-xs">Arb</span>
                        </Pill>
                    )}
                    <span className="whitespace-nowrap">
                        {props.routes.length}{' '}
                        {props.routes.length === 1 ? 'swap' : 'swaps'}
                    </span>
                </span>
            </>
        }
        headerClassName="justify-between"
    >
        <div className="scroll-area-component flex flex-col gap-6 overflow-x-auto">
            {props.routes.map((hops, i) => (
                <DexExecutionRoute key={i} hops={hops} />
            ))}
        </div>
    </Collapsible>
)

export default DexSwapExecution
