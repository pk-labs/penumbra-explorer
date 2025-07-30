import { makeSubject, pipe, subscribe } from 'wonka'
import throttleStream from './throttleStream'

describe('throttleStream', () => {
    test('emits latest items every interval', async () => {
        const subject = makeSubject<number>()
        const source = subject.source
        const throttled = throttleStream(source, 1000, 10)

        const subscriber = jest.fn()
        const subscription = pipe(throttled, subscribe(subscriber))

        for (let i = 1; i <= 15; i++) {
            subject.next(i)
        }

        expect(subscriber).not.toHaveBeenCalled()

        jest.advanceTimersByTime(1000)

        expect(subscriber).toHaveBeenCalledWith([
            6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        ])

        for (let i = 16; i <= 20; i++) {
            subject.next(i)
        }

        jest.advanceTimersByTime(1000)

        expect(subscriber).toHaveBeenCalledWith([16, 17, 18, 19, 20])

        jest.advanceTimersByTime(1000)

        expect(subscriber).toHaveBeenCalledTimes(2)

        subscription.unsubscribe()
    })
})
