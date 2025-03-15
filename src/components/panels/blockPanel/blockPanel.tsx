import Image from 'next/image'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Panel } from '../panel'
import styles from './blockPanel.module.css'
import icon from './blockPanelIcon.svg'

export interface Props {
    className?: string
    number?: number
}

const BlockPanel: FC<Props> = props => (
    <Panel
        className={twMerge(styles.root, styles.gradient, props.className)}
        // footer="Block time ~12s"
        number={props.number}
        title={
            <>
                <Image alt="Current block" src={icon} />
                <span>Current block</span>
            </>
        }
    >
        {/*<div className={styles.chart}>*/}
        {/*    {Array.from({ length: 6 }).map((_, i) => (*/}
        {/*        <div key={i} className={twMerge(styles.bar, styles.full)} />*/}
        {/*    ))}*/}
        {/*    {Array.from({ length: 13 }).map((_, i) => (*/}
        {/*        <div key={6 + i} className={styles.bar} />*/}
        {/*    ))}*/}
        {/*</div>*/}
        {/*<div className={styles.footer}>*/}
        {/*    <Box size={14} />*/}
        {/*    <span>Received new block</span>*/}
        {/*    <span>2s</span>*/}
        {/*</div>*/}
    </Panel>
)

export default BlockPanel
