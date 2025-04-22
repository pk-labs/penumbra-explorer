import { FC } from 'react'
import { UmPriceData } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props extends UmPriceData {
    className?: string
}

const UmPrice: FC<Props> = props => (
    <div
        className={classNames(
            'border-other-tonalFill10 relative z-40 flex h-8 items-center',
            'justify-center gap-0.5 rounded-full border-1 px-4 text-sm',
            'font-medium',
            props.className
        )}
    >
        <span className="text-text-secondary whitespace-nowrap">UM Price:</span>
        <span>${props.price.toFixed(2)}</span>
        <span
            className={classNames(
                props.change > 0 && 'text-success-light',
                props.change < 0 && 'text-destructive-light'
            )}
        >
            ({props.change > 0 && '+'}
            {props.change.toFixed(1)}%)
        </span>
    </div>
)

export default UmPrice
