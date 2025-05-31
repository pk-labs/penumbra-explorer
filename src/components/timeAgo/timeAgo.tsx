'use client'

import { FC, useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'
import { useTicker } from '@/lib/hooks'

interface Props {
    initialTimeAgo: string
    ticker?: boolean
    timestamp: number
}

// TODO: Refactor to TimeAgoTicker and only use for live updates. Render regular
// time ago to string without using this component.
const TimeAgo: FC<Props> = props => {
    const lastTick = useTicker(props.ticker ?? false)
    const [timeAgo, setTimeAgo] = useState(props.initialTimeAgo)

    useEffect(() => {
        if (props.ticker) {
            setTimeAgo(dayjs(lastTick).to(props.timestamp))
        }
    }, [lastTick, props.ticker, props.timestamp])

    return timeAgo
}

export default TimeAgo
