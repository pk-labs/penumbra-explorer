import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getDexBlockExecutions from './getDexBlockExecutions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getDexBlockExecutions', () => {
    test('returns transformed data', async () => {
        const lastUpdated = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            latestExecutions: [
                                {
                                    batchSwaps: [
                                        {
                                            individualSwaps: [
                                                {
                                                    routeSteps: [
                                                        { amount: '789' },
                                                    ],
                                                },
                                            ],
                                            totalInputAmount: '123',
                                            totalInputAssetId: 'base',
                                            totalOutputAmount: '456',
                                            totalOutputAssetId: 'quote',
                                        },
                                    ],
                                    timestamp: lastUpdated.toISOString(),
                                },
                            ],
                        },
                    }),
            }),
        })

        await expect(getDexBlockExecutions()).resolves.toMatchObject([
            {
                swapExecutions: [
                    {
                        baseAmount: 123,
                        baseAssetId: 'base',
                        quoteAmount: 456,
                        quoteAssetId: 'quote',
                        routes: [[{ amount: 789 }]],
                    },
                ],
                timestamp: lastUpdated.valueOf(),
            },
        ])
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getDexBlockExecutions()).rejects.toBe('foo')
    })
})
