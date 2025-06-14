'use client'

import { FC, useEffect, useState } from 'react'
import { useTicker } from '@/lib/hooks'

interface Props {
    className?: string
    timestamp: number
}

const TimeAgo: FC<Props> = props => {
    const lastTick = useTicker()
    const [timeAgo, setTimeAgo] = useState<string>()

    useEffect(() => {
        setTimeAgo(lastTick.to(props.timestamp))
    }, [lastTick, props.timestamp])

    return timeAgo
}

export default TimeAgo
