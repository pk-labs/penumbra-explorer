import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getLiquidityPositions from './getLiquidityPositions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getLiquidityPositions', () => {
    test('returns transformed data', async () => {
        const updatedAt = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            liquidityPositions: {
                                items: [
                                    {
                                        feePercentage: 0.5,
                                        positionId: 'foo',
                                        reserves1Amount: '123',
                                        reserves2Amount: '456',
                                        tradingPairAsset1: 'base',
                                        tradingPairAsset2: 'quote',
                                        updatedAt: updatedAt.toISOString(),
                                    },
                                ],
                            },
                        },
                    }),
            }),
        })

        await expect(
            getLiquidityPositions({ length: 1 })
        ).resolves.toMatchObject({
            positions: [
                {
                    baseAssetId: 'base',
                    baseReserve: 123,
                    fee: 0.5,
                    id: 'foo',
                    quoteAssetId: 'quote',
                    quoteReserve: 456,
                    timestamp: updatedAt.valueOf(),
                },
            ],
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getLiquidityPositions({ length: 1 })).rejects.toBe('foo')
    })
})
