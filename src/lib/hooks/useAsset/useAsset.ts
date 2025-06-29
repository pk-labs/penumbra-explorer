import {
    AssetId,
    Metadata,
} from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import { base64ToUint8Array } from '@penumbra-zone/types/base64'
import { useEffect, useState } from 'react'
import useGetMetadata from '../useGetMetadata'

const useAsset = (id: string) => {
    const getMetadata = useGetMetadata()
    const [asset, setAsset] = useState<Metadata | null>()

    useEffect(() => {
        if (getMetadata) {
            setAsset(
                getMetadata(new AssetId({ inner: base64ToUint8Array(id) })) ??
                    null
            )
        }
    }, [getMetadata, id])

    return asset
}

export default useAsset
