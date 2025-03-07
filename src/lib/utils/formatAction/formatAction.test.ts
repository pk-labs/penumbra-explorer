import { ActionType } from '@/lib/types'
import formatAction from './formatAction'

describe('formatAction', () => {
    test('formats single-word action', async () => {
        expect(formatAction(ActionType.send)).toBe('send')
    })

    test('formats multi-word action', async () => {
        expect(formatAction(ActionType.unknownInternal)).toBe(
            'unknown internal'
        )
    })
})
