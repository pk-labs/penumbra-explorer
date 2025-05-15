// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { Skeleton, UmPrice } from '@/components'
import { getUmPrice } from '@/lib/data'
import { UmPriceData } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props {
    className?: string
}

// TODO: Refactor UM price container to server component to circumvent API CORS?
const UmPriceContainer: FC<Props> = props => {
    const [umPrice, setUmPrice] = useState<UmPriceData>()

    useEffect(() => {
        getUmPrice().then(setUmPrice)
    }, [])

    return umPrice ? (
        <UmPrice className={props.className} {...umPrice} />
    ) : (
        <Skeleton
            className={classNames('h-8 w-48 rounded-full', props.className)}
        />
    )
}

export default UmPriceContainer
