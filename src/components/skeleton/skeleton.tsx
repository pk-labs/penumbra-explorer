import {
    Skeleton as PenumbraSkeleton,
    SkeletonProps as PenumbraSkeletonProps,
} from '@penumbra-zone/ui/Skeleton'
import { FC } from 'react'

interface Props extends Pick<PenumbraSkeletonProps, 'circular'> {
    className?: string
}

const Skeleton: FC<Props> = ({ className, ...props }) => (
    <div className={className}>
        <PenumbraSkeleton {...props} />
    </div>
)

export default Skeleton
