import { searchIbc } from './ibc'

describe('ibc', () => {
    describe('searchIbc', () => {
        test('returns first client with name starting with query', async () => {
            expect(searchIbc('co')).toEqual(
                expect.objectContaining({
                    id: '07-tendermint-0',
                    name: 'Cosmos Hub',
                })
            )
        })

        describe('returns nothing', () => {
            test('when query too short', async () => {
                expect(searchIbc('c')).toBeUndefined()
            })

            test('when client not found', async () => {
                expect(searchIbc('foo')).toBeUndefined()
            })
        })
    })
})
