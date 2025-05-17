import getUmPrice from './getUmPrice'

describe('getUmPrice', () => {
    test('returns transformed data', async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => ({
                    change: {
                        percent: '9.99',
                        sign: 'negative',
                    },
                    price: '9999',
                }),
            })
        )

        await expect(getUmPrice()).resolves.toEqual({
            change: -9.99,
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
