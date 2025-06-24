import { FC } from 'react'
import { DexExecutionHop } from '@/lib/types'
import { classNames } from '@/lib/utils'
import AssetValue from '../assetValue'

interface Props {
    hops: DexExecutionHop[]
}

const DexExecutionRoute: FC<Props> = props => {
    const firstHop = props.hops[0]
    const lastHop = props.hops[props.hops.length - 1]

    const separator = (
        <span className="border-t-other-tonalStroke min-w-4 flex-1 border-t-1" />
    )

    if (props.hops.length > 2) {
        const collapsedHops = props.hops.length - 2

        return (
            <div className="flex items-center">
                <span className="flex flex-1 items-center">
                    <AssetValue {...firstHop} density="slim" />
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
                    <AssetValue {...lastHop} density="slim" />
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center">
            <AssetValue {...firstHop} density="slim" />
            {separator}
            <AssetValue {...lastHop} density="slim" />
        </div>
    )
}

export default DexExecutionRoute
