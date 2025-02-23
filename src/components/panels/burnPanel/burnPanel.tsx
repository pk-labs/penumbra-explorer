/* istanbul ignore file */
import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import { Panel } from '../panel'
import styles from './burnPanel.module.css'
import icon from './burnPanelIcon.png'

export interface Props {
    className?: ReactNode
}

const BurnPanel: FC<Props> = props => (
    <Panel
        className={clsx(styles.root, props.className)}
        footer="Average"
        number={86990}
        numberSuffix=" UM"
        title={
            <>
                <Image alt="Total burn" height={24} src={icon.src} width={24} />
                <span>Total burn</span>
            </>
        }
    >
        <div className={styles.chart}>
            <div className={styles.bar} style={{ height: 32, marginTop: 22 }} />
            <div className={styles.bar} style={{ height: 28, marginTop: 18 }} />
            <div className={styles.bar} style={{ height: 20, marginTop: 29 }} />
            <div className={styles.bar} style={{ height: 19, marginTop: 29 }} />
            <div className={styles.bar} style={{ height: 32, marginTop: 22 }} />
            <div className={styles.bar} style={{ height: 29, marginTop: 12 }} />
            <div className={styles.bar} style={{ height: 26, marginTop: 28 }} />
            <div className={styles.bar} style={{ height: 50, marginTop: 12 }} />
            <div className={styles.bar} style={{ height: 58, marginTop: 4 }} />
            <div className={styles.bar} style={{ height: 36, marginTop: 18 }} />
            <div className={styles.bar} style={{ height: 21, marginTop: 24 }} />
            <div className={styles.bar} style={{ height: 33, marginTop: 12 }} />
            <div className={styles.bar} style={{ height: 30, marginTop: 24 }} />
            <div className={styles.bar} style={{ height: 33, marginTop: 12 }} />
            <div className={styles.bar} style={{ height: 42, marginTop: 12 }} />
            <div className={styles.bar} style={{ height: 19, marginTop: 19 }} />
            <div className={styles.bar} style={{ height: 19, marginTop: 19 }} />
            <div className={styles.bar} style={{ height: 29, marginTop: 19 }} />
            <div className={styles.bar} style={{ height: 36, marginTop: 12 }} />
            <div className={styles.bar} style={{ height: 62 }} />
            <div className={styles.bar} style={{ height: 27, marginTop: 20 }} />
        </div>
        <div className={styles.footer}>
            <span>Jan 13</span>
            <span>Jan 14</span>
            <span>Today</span>
        </div>
    </Panel>
)

export default BurnPanel
