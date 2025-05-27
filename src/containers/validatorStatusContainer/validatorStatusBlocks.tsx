import { FC } from 'react'
import { classNames } from '@/lib/utils'

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
                    'bg-neutral-main inline-block h-[15px] w-[15px]',
                    'rounded-xs',
                    props.missedBlocks.has(block) && 'bg-destructive-light',
                    props.signedBlocks.has(block) && 'bg-success-light'
                )}
            />
        ))}
    </div>
)

export default ValidatorStatusBlocks
