'use client'

import { AssetGroup, AssetGroupProps } from '@penumbra-zone/ui/AssetIcon'
import { FC } from 'react'
import { useAsset } from '@/lib/hooks'
import { classNames } from '@/lib/utils'
import Skeleton from '../skeleton'

interface Props extends Pick<AssetGroupProps, 'size'> {
    baseAssetId: string
    className?: string
    quoteAssetId: string
}

const AssetPair: FC<Props> = props => {
    const baseAsset = useAsset(props.baseAssetId)
    const quoteAsset = useAsset(props.quoteAssetId)

    if (typeof baseAsset === 'undefined' || typeof quoteAsset === 'undefined') {
        return <Skeleton className="h-8 w-24" />
    } else if (baseAsset === null || quoteAsset === null) {
        return 'NA'
    }

    return (
        <span
            className={classNames(
                'inline-flex items-center gap-2',
                props.className
            )}
        >
            <AssetGroup
                assets={[baseAsset, quoteAsset]}
                size={props.size}
                variant="split"
            />
            <span>
                {baseAsset.symbol}/{quoteAsset.symbol}
            </span>
        </span>
    )
}

export default AssetPair
