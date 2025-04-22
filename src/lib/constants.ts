// istanbul ignore file
export const appName = 'Penumbra Blockchain Explorer'
export const fastOutSlowIn = [0.4, 0, 0.2, 1]

export const ibcConnections = [
    {
        addressPrefix: 'cosmos',
        chainId: 'cosmoshub-4',
        channelId: 'channel-0',
        clientStatus: 'active',
        counterpartyChannelId: 'channel-940',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg',
        name: 'Cosmos Hub',
    },
    {
        addressPrefix: 'noble',
        chainId: 'noble-1',
        channelId: 'channel-2',
        clientStatus: 'active',
        counterpartyChannelId: 'channel-89',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.svg',
        name: 'Noble',
    },
    {
        addressPrefix: 'celestia',
        chainId: 'celestia',
        channelId: 'channel-3',
        clientStatus: 'frozen',
        counterpartyChannelId: 'channel-35',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.svg',
        name: 'Celestia',
    },
    {
        addressPrefix: 'osmo',
        chainId: 'osmosis-1',
        channelId: 'channel-4',
        clientStatus: 'expired',
        counterpartyChannelId: 'channel-79703',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg',
        name: 'Osmosis',
    },
    {
        addressPrefix: 'stride',
        chainId: 'stride-1',
        channelId: 'channel-8',
        clientStatus: 'unknown',
        counterpartyChannelId: 'channel-307',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.svg',
        name: 'Stride',
    },
    {
        addressPrefix: 'neutron',
        chainId: 'neutron-1',
        channelId: 'channel-9',
        clientStatus: 'active',
        counterpartyChannelId: 'channel-6560',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/neutron.svg',
        name: 'Neutron',
    },
    {
        addressPrefix: 'axelar',
        chainId: 'axelar-dojo-1',
        channelId: 'channel-7',
        clientStatus: 'frozen',
        counterpartyChannelId: 'channel-171',
        image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.svg',
        name: 'Axelar',
    },
]
