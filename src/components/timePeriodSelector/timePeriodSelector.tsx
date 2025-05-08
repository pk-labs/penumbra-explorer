'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { TimePeriod } from '@/lib/graphql/generated/types'
import Density from '../density'
import SegmentedControl from '../segmentedControl'

interface Props {
    className?: string
    timePeriod?: TimePeriod
}

const TimePeriodSelector: FC<Props> = props => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [timePeriod, setTimePeriod] = useState(
        props.timePeriod ?? TimePeriod.Day
    )

    const onChange = useCallback(
        (timePeriod: string) => {
            // TODO: Extract and refactor parsing/converting
            switch (timePeriod) {
                case '24h':
                    setTimePeriod(TimePeriod.Day)
                    break
                case '30d':
                    setTimePeriod(TimePeriod.Month)
                    break
                case 'All':
                    setTimePeriod(TimePeriod.All)
                    break
            }

            // TODO: Implement helper for search params routing
            const params = new URLSearchParams(searchParams)

            if (timePeriod === '24h') {
                params.delete('period')
                router.push(`${pathname}${params.size ? `?${params}` : ''}`)
            } else {
                params.set('period', timePeriod.toLowerCase())
                router.push(`${pathname}?${params}`)
            }
        },
        [pathname, router, searchParams]
    )

    // TODO: Extract and refactor parsing/converting
    let value

    switch (timePeriod) {
        case TimePeriod.Day:
            value = '24h'
            break
        case TimePeriod.Month:
            value = '30d'
            break
        case TimePeriod.All:
            value = 'All'
            break
    }

    return (
        <Density compact>
            <SegmentedControl
                className={props.className}
                onChange={onChange}
                value={value}
            >
                <SegmentedControl.Item style="filled" value="24h" />
                <SegmentedControl.Item style="filled" value="30d" />
                <SegmentedControl.Item style="filled" value="All" />
            </SegmentedControl>
        </Density>
    )
}

export default TimePeriodSelector
