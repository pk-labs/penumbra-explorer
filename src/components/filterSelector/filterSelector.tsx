'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback } from 'react'
import Density from '../density'
import SegmentedControl from '../segmentedControl'

interface Props {
    className?: string
    filters: string[]
    selectedFilter?: string
}

const FilterSelector: FC<Props> = props => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedFilter = props.selectedFilter ?? props.filters.at(0)

    const onChange = useCallback(
        (value: string) => {
            // FIXME: Click on selected value results in empty string here
            if (!value || value === selectedFilter) {
                return
            }

            const params = new URLSearchParams(searchParams)

            if (value === props.filters.at(0)) {
                params.delete('filter')
            } else {
                params.set('filter', value)
            }

            const queryString = params.toString()
            router.push(`${pathname}${queryString ? `?${queryString}` : ''}`)
        },
        [pathname, props.filters, router, searchParams, selectedFilter]
    )

    if (!selectedFilter || !props.filters.includes(selectedFilter)) {
        return
    }

    return (
        <Density compact>
            <SegmentedControl
                className={props.className}
                onChange={onChange}
                value={selectedFilter}
            >
                {props.filters.map(filter => (
                    <SegmentedControl.Item
                        key={filter}
                        style="filled"
                        value={filter}
                    />
                ))}
            </SegmentedControl>
        </Density>
    )
}

export default FilterSelector
