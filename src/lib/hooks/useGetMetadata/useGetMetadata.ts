// istanbul ignore file
import { ChainRegistryClient, Registry } from '@penumbra-labs/registry'
import { ActionViewProps } from '@penumbra-zone/ui/ActionView'
import { useEffect, useState } from 'react'

type GetMetadata = ActionViewProps['getMetadata']

const useGetMetadata = (chainId: string): GetMetadata | undefined => {
    const [registry, setRegistry] = useState<Registry>()

    useEffect(() => {
        const client = new ChainRegistryClient()
        client.remote.get(chainId).then(setRegistry).catch(console.error)
    }, [chainId])

    return registry?.tryGetMetadata.bind(registry)
}

export default useGetMetadata
