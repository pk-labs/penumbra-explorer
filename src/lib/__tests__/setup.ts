/* istanbul ignore file */
import '@testing-library/jest-dom'

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()

    window.localStorage.clear()
    document.title = ''
})
