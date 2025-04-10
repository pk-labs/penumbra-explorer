// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { getUmPrice } from '@/lib/data'
import { UmPriceData } from '@/lib/types'
import Skeleton from '../skeleton'
import UmPrice from './umPrice'

interface Props {
    className?: string
}

const UmPriceContainer: FC<Props> = props => {
    const [umPrice, setUmPrice] = useState<UmPriceData>()

    useEffect(() => {
        getUmPrice().then(setUmPrice)
    }, [])

    return umPrice ? (
        <UmPrice className={props.className} {...umPrice} />
    ) : (
        <Skeleton className={twMerge('h-8 w-32', props.className)} circular />
    )
}

export default UmPriceContainer
