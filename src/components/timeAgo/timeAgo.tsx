'use client'

import { FC, useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'
import { useTicker } from '@/lib/hooks'

interface Props {
    initialTimeAgo: string
    timestamp: number
}

const TimeAgo: FC<Props> = props => {
    const lastTick = useTicker()
    const [timeAgo, setTimeAgo] = useState(props.initialTimeAgo)

    useEffect(() => {
        setTimeAgo(dayjs(lastTick).to(props.timestamp))
    }, [lastTick, props.timestamp])

    return timeAgo
}

export default TimeAgo
