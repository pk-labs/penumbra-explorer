/* istanbul ignore file */
import '@testing-library/jest-dom'

// TODO: Remove again when no longer using @penumbra-zone/protobuf
jest.mock('../../lib/utils/decodeTransaction/decodeTransaction', () =>
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
