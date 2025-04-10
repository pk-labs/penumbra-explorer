import getUmPrice from './getUmPrice'

describe('getUmPrice', () => {
    test('returns price and change', async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => ({
                    market_data: {
                        current_price: {
                            usd: 9999,
                        },
                        price_change_percentage_24h: 9.99,
                    },
                }),
            })
        )

        await expect(getUmPrice()).resolves.toEqual({
            change: 9.99,
            price: 9999,
        })
    })

    test('logs error', async () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        global.fetch = jest.fn().mockImplementation(() => Promise.reject('foo'))

        await getUmPrice()
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
