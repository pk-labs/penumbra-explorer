'use client'

import { FC, useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'

interface Props {
    initialTimeAgo: string
    timestamp: number
}

const TimeAgo: FC<Props> = props => {
    const [timeAgo, setTimeAgo] = useState(props.initialTimeAgo)

    useEffect(() => {
        const interval = setInterval(
            () => setTimeAgo(dayjs().to(props.timestamp)),
            1000
        )

        return () => clearInterval(interval)
    }, [props.timestamp])

    return timeAgo
}

export default TimeAgo
