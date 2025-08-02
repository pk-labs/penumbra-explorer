'use client'

import { FC, Suspense, useEffect, useState } from 'react'
import { useTicker } from '@/lib/hooks'

interface Props {
    className?: string
    timestamp: number
}

const TimeAgo: FC<Props> = props => {
    const lastTick = useTicker()
    const [timeAgo, setTimeAgo] = useState(lastTick.to(props.timestamp))

    useEffect(() => {
        setTimeAgo(lastTick.to(props.timestamp))
    }, [lastTick, props.timestamp])

    return <Suspense fallback={timeAgo}>{timeAgo}</Suspense>
}

export default TimeAgo
