import { FC } from 'react'
import { classNames } from '@/lib/utils'
import styles from './validatorStatusContainer.module.css'

interface Props {
    blocks: number[]
    missedBlocks: Set<number>
    signedBlocks: Set<number>
}

const ValidatorStatusBlocks: FC<Props> = props => (
    <div className={classNames('flex flex-wrap gap-2')}>
        {props.blocks.map(block => (
            <span
                key={block}
                className={classNames(
                    styles.block,
                    props.signedBlocks.has(block) && styles.signed,
                    props.missedBlocks.has(block) && styles.missed
                )}
            />
        ))}
    </div>
)

export default ValidatorStatusBlocks
