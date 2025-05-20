// istanbul ignore file
import { ChainRegistryClient } from '@penumbra-labs/registry'
import { ActionViewProps } from '@penumbra-zone/ui/ActionView'
import { create } from 'zustand/react'

let initializationAttempted = false

type State = {
    getMetadata?: ActionViewProps['getMetadata']
}

const useStore = create<State>(set => {
    const state = {
        getMetadata: undefined,
    }

    const initialize = async () => {
        if (initializationAttempted) {
            return
        }

        initializationAttempted = true

        try {
            const client = new ChainRegistryClient()
            const registry = await client.remote.get('penumbra-1')
            const getMetadata = registry?.tryGetMetadata.bind(registry)

            set({ getMetadata })
        } catch (e) {
            throw e
        }
    }

    initialize().catch(console.error)

    return state
})

const useGetMetadata = () => useStore(state => state.getMetadata)

export default useGetMetadata
