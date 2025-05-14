import axelar from './axelar.svg'
import celestia from './celestia.svg'
import cosmoshub from './cosmoshub.svg'
import dydx from './dydx.svg'
import injective from './injective.svg'
import neutron from './neutron.svg'
import noble from './noble.svg'
import osmosis from './osmosis.svg'
import stride from './stride.svg'

export const ibc = [
    {
        chainId: 'cosmoshub-4',
        id: '07-tendermint-0',
        image: cosmoshub,
        name: 'Cosmos Hub',
        slug: 'cosmoshub',
    },
    {
        chainId: 'noble-1',
        id: '07-tendermint-2',
        image: noble,
        name: 'Noble',
        slug: 'noble',
    },
    {
        chainId: 'celestia',
        id: '07-tendermint-3',
        image: celestia,
        name: 'Celestia',
        slug: 'celestia',
    },
    {
        chainId: 'osmosis-1',
        id: '07-tendermint-4',
        image: osmosis,
        name: 'Osmosis',
        slug: 'osmosis',
    },
    {
        chainId: 'axelar-dojo-1',
        id: '07-tendermint-11',
        image: axelar,
        name: 'Axelar',
        slug: 'axelar',
    },
    {
        chainId: 'stride-1',
        id: '07-tendermint-12',
        image: stride,
        name: 'Stride',
        slug: 'stride',
    },
    {
        chainId: 'neutron-1',
        id: '07-tendermint-14',
        image: neutron,
        name: 'Neutron',
        slug: 'neutron',
    },
    {
        chainId: 'injective-1',
        id: '07-tendermint-20',
        image: injective,
        name: 'Injective Finance',
        slug: 'injective',
    },
    {
        chainId: 'dxdy-mainnet-1',
        id: '07-tendermint-22',
        image: dydx,
        name: 'dYdX Protocol',
        slug: 'dydx',
    },
]

export const searchIbc = (query: string) => {
    if (query.length < 2) {
        return
    }

    const transformedQuery = query.toLowerCase()

    return ibc.find(client =>
        client.name.toLowerCase().startsWith(transformedQuery)
    )
}
