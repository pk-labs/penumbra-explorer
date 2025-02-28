'use client'

import { FC, useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'

interface Props {
    isoDate: string
}

const TimeAgo: FC<Props> = props => {
    const [timeAgo, setTimeAgo] = useState<string>()

    useEffect(() => {
        const now = dayjs()
        setTimeAgo(now.to(dayjs(props.isoDate)))
    }, [props.isoDate])

    return timeAgo ?? <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
}

export default TimeAgo
