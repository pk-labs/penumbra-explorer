import { useEffect } from 'react'
import { create } from 'zustand/react'
import { useShallow } from 'zustand/react/shallow'
import dayjs from '@/lib/dayjs'

type State = {
    addListener: () => void
    interval?: NodeJS.Timeout
    lastTick: number
    listeners: number
    removeListener: () => void
}

const useStore = create<State>(set => ({
    addListener: () =>
        set(prev => {
            if (prev.listeners === 0) {
                return {
                    interval: setInterval(
                        () => set({ lastTick: dayjs().valueOf() }),
                        1000
                    ),
                    listeners: prev.listeners + 1,
                }
            }

            return {
                listeners: prev.listeners + 1,
            }
        }),
    lastTick: dayjs().valueOf(),
    listeners: 0,
    removeListener: () =>
        set(prev => {
            if (prev.listeners === 1) {
                clearInterval(prev.interval)

                return {
                    interval: undefined,
                    listeners: prev.listeners - 1,
                }
            }

            return { listeners: prev.listeners - 1 }
        }),
}))

const useTicker = (listen = true) => {
    const { addListener, lastTick, removeListener } = useStore(
        useShallow(state => ({
            addListener: state.addListener,
            lastTick: state.lastTick,
            removeListener: state.removeListener,
        }))
    )

    useEffect(() => {
        if (!listen) {
            return
        }

        addListener()
        return () => removeListener()
    }, [addListener, listen, removeListener])

    return lastTick
}

export default useTicker
