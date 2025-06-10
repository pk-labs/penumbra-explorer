import { FC } from 'react'
import { classNames } from '@/lib/utils'
import Button from '../../button'

export interface Props {
    className?: string
    nextHref?: string
    prevHref?: string
}

const ViewNavigation: FC<Props> = props => (
    <nav
        className={classNames(
            'flex items-center justify-end gap-1',
            props.className
        )}
    >
        <Button
            density="compact"
            disabled={!props.prevHref}
            href={props.prevHref}
            icon="ArrowLeft"
            iconOnly
        >
            Prev
        </Button>
        <Button
            density="compact"
            disabled={!props.nextHref}
            href={props.nextHref}
            icon="ArrowRight"
            iconOnly
        >
            Next
        </Button>
    </nav>
)

export default ViewNavigation
