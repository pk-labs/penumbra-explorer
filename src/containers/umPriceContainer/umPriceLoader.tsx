// istanbul ignore file
import { FC } from 'react'
import { UmPrice } from '@/components'
import { getUmPrice } from '@/lib/data'
import { Props } from './umPriceContainer'

const UmPriceLoader: FC<Props> = async props => {
    const umPrice = await getUmPrice()

    if (!umPrice) {
        return
    }

    return <UmPrice className={props.className} {...umPrice} />
}

export default UmPriceLoader
