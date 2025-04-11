import { Skeleton as PenumbraSkeleton } from '@penumbra-zone/ui/Skeleton'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    className?: string
}

const Skeleton: FC<Props> = props => (
    <div className={twMerge('overflow-hidden', props.className)}>
        <PenumbraSkeleton />
    </div>
)

export default Skeleton
