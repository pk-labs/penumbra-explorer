import { FC } from 'react'
import { classNames } from '@/lib/utils'
import Button from '../button'

interface Props {
    className?: string
    fromNext?: string
    fromPrev?: string
    pathname: string
}

const Pagination: FC<Props> = props => {
    let prevHref: string | undefined
    let nextHref: string | undefined

    if (props.fromPrev) {
        prevHref = `${props.pathname}?from=${props.fromPrev}`
    }

    if (props.fromNext) {
        nextHref = `${props.pathname}?from=${props.fromNext}`
    }

    return (
        <div
            className={classNames(
                'flex items-center justify-center gap-6',
                props.className
            )}
        >
            <Button
                className="font-normal"
                density="compact"
                disabled={!props.fromPrev}
                href={prevHref}
            >
                Prev
            </Button>
            <Button
                className="font-normal"
                density="compact"
                disabled={!props.fromNext}
                href={nextHref}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination
