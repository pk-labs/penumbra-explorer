'use client'

import { FC, useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'

interface Props {
    initialTimeAgo: string
    timestamp: number
    update?: boolean
}

const TimeAgo: FC<Props> = props => {
    const [timeAgo, setTimeAgo] = useState(props.initialTimeAgo)

    useEffect(() => {
        if (!props.update) {
            return
        }

        const interval = setInterval(
            () => setTimeAgo(dayjs().to(props.timestamp)),
            1000
        )

        return () => clearInterval(interval)
    }, [props.timestamp, props.update])

    return timeAgo
}

export default TimeAgo
