import { Skeleton as PenumbraSkeleton } from '@penumbra-zone/ui/Skeleton'
import { FC } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    className?: string
}

const Skeleton: FC<Props> = props => (
    <div className={classNames('overflow-hidden', props.className)}>
        <PenumbraSkeleton />
    </div>
)

export default Skeleton
