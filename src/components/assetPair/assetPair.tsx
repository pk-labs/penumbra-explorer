'use client'

import { AssetGroup, AssetGroupProps } from '@penumbra-zone/ui/AssetIcon'
import { FC } from 'react'
import { useAsset } from '@/lib/hooks'
import { classNames } from '@/lib/utils'

interface Props extends Pick<AssetGroupProps, 'size'> {
    baseAssetId: string
    className?: string
    quoteAssetId: string
}

const AssetPair: FC<Props> = props => {
    const baseAsset = useAsset(props.baseAssetId)
    const quoteAsset = useAsset(props.quoteAssetId)

    if (!baseAsset || !quoteAsset) {
        return
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
