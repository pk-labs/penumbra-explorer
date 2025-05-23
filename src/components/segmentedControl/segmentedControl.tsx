'use client'

import {
    SegmentedControl as PenumbraSegmentedControl,
    SegmentedControlItem as PenumbraSegmentedControlItem,
    SegmentedControlProps as PenumbraSegmentedControlProps,
} from '@penumbra-zone/ui/SegmentedControl'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import styles from './segmentedControl.module.css'

interface Props extends PenumbraSegmentedControlProps {
    className?: string
}

interface StaticProps {
    Item: typeof PenumbraSegmentedControlItem
}

const SegmentedControl: FC<Props> & StaticProps = ({ className, ...props }) => (
    <div className={classNames(styles.root, className)}>
        <PenumbraSegmentedControl {...props} />
    </div>
)

SegmentedControl.Item = PenumbraSegmentedControlItem

export default SegmentedControl
