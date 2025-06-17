import { motion } from 'motion/react'
import { FC, useState } from 'react'
import { ValidatorBlock } from '@/lib/types'
import { classNames } from '@/lib/utils'
import styles from './validatorStatusContainer.module.css'

interface Props {
    block: ValidatorBlock
    documentVisible: boolean
    index: number
}

const AnimatedValidatorBlock: FC<Props> = props => {
    const [documentVisible] = useState(props.documentVisible)

    return (
        <motion.span
            animate={
                props.index === 0 &&
                documentVisible && {
                    opacity: 1,
                    scale: 1,
                }
            }
            className={classNames(
                styles.block,
                props.block.signed === true && styles.signed,
                props.block.signed === false && styles.missed
            )}
            exit={{
                opacity: 0,
                scale: 0.8,
            }}
            initial={
                documentVisible && {
                    opacity: 0,
                    scale: 0.8,
                }
            }
            transition={{
                duration: 0.3,
                layout: {
                    duration: 0.5,
                },
            }}
            viewport={{ once: true }}
            whileInView={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.2 + props.index * 0.0016 },
            }}
            layout
        />
    )
}

export default AnimatedValidatorBlock
