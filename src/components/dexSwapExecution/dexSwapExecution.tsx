import { ArrowRightIcon } from 'lucide-react'
import { FC } from 'react'
import { TransformedDexSwapExecution } from '@/lib/types'
import { classNames } from '@/lib/utils'
import AssetValue from '../assetValue'
import Collapsible from '../collapsible'
import DexExecutionRoute from './dexExecutionRoute'

interface Props extends TransformedDexSwapExecution {
    className?: string
}

const DexSwapExecution: FC<Props> = props => (
    <Collapsible
        className={classNames('font-mono text-xs font-medium', props.className)}
        contentClassName="flex flex-col gap-6 overflow-x-auto"
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
                <span>
                    {props.routes.length}{' '}
                    {props.routes.length === 1 ? 'swap' : 'swaps'}
                </span>
            </>
        }
        headerClassName="justify-between"
    >
        {props.routes.map((hops, i) => (
            <DexExecutionRoute key={i} hops={hops} />
        ))}
    </Collapsible>
)

export default DexSwapExecution
