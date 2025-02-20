import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import Panel from '../panel'
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
            <div className={styles.bar} style={{ marginTop: 22, height: 32 }} />
            <div className={styles.bar} style={{ marginTop: 18, height: 28 }} />
            <div className={styles.bar} style={{ marginTop: 29, height: 20 }} />
            <div className={styles.bar} style={{ marginTop: 29, height: 19 }} />
            <div className={styles.bar} style={{ marginTop: 22, height: 32 }} />
            <div className={styles.bar} style={{ marginTop: 12, height: 29 }} />
            <div className={styles.bar} style={{ marginTop: 28, height: 26 }} />
            <div className={styles.bar} style={{ marginTop: 12, height: 50 }} />
            <div className={styles.bar} style={{ marginTop: 4, height: 58 }} />
            <div className={styles.bar} style={{ marginTop: 18, height: 36 }} />
            <div className={styles.bar} style={{ marginTop: 24, height: 21 }} />
            <div className={styles.bar} style={{ marginTop: 12, height: 33 }} />
            <div className={styles.bar} style={{ marginTop: 24, height: 30 }} />
            <div className={styles.bar} style={{ marginTop: 12, height: 33 }} />
            <div className={styles.bar} style={{ marginTop: 12, height: 42 }} />
            <div className={styles.bar} style={{ marginTop: 19, height: 19 }} />
            <div className={styles.bar} style={{ marginTop: 19, height: 19 }} />
            <div className={styles.bar} style={{ marginTop: 19, height: 29 }} />
            <div className={styles.bar} style={{ marginTop: 12, height: 36 }} />
            <div className={styles.bar} style={{ height: 62 }} />
            <div className={styles.bar} style={{ marginTop: 20, height: 27 }} />
        </div>
        <div className={styles.footer}>
            <span>Jan 13</span>
            <span>Jan 14</span>
            <span>Today</span>
        </div>
    </Panel>
)

export default BurnPanel
