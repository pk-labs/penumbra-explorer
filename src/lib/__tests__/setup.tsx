// istanbul ignore file
import '@testing-library/jest-dom'

jest.mock('../../lib/graphql/graphqlClientProvider', () => (props: any) => (
    <div>{props.children} </div>
))

jest.mock('../../lib/hooks/useGetMetadata/useGetMetadata', () => jest.fn())

jest.mock('../../lib/utils/actionToView/actionToView', () => jest.fn())

jest.mock('../../lib/utils/decodeTransaction/decodeTransaction', () =>
    jest.fn()
)

jest.mock('../../lib/utils/findPrimaryAction/findPrimaryAction', () =>
    jest.fn()
)

jest.mock('../../lib/utils/transactionToView/transactionToView', () =>
    jest.fn()
)

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()

    window.localStorage.clear()
    document.title = ''
})
