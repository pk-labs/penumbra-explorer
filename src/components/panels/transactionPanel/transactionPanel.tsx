import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import { Panel } from '../panel'
import styles from './transactionPanel.module.css'
import icon from './transactionPanelIcon.svg'

export interface Props {
    className?: ReactNode
    number?: number
}

const TransactionPanel: FC<Props> = props => (
    <Panel
        className={clsx(styles.root, styles.gradient, props.className)}
        // footer={`${formatNumber(68499)} new today`}
        number={props.number}
        title={
            <>
                <Image
                    alt="Total transactions"
                    height={icon.height}
                    src={icon.src}
                    width={icon.width}
                />
                <span>Total transactions</span>
            </>
        }
    >
        {/*<div className={styles.chart}>*/}
        {/*    <div className={styles.verticalBarGroup}>*/}
        {/*        <div*/}
        {/*            className={clsx(styles.bar, styles.top)}*/}
        {/*            style={{ height: 7 }}*/}
        {/*        />*/}
        {/*        <div*/}
        {/*            className={clsx(styles.bar, styles.bottom)}*/}
        {/*            style={{ height: 22 }}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className={styles.horizontalBarGroup}>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 12 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 10 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 18 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 11 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={styles.horizontalBarGroup}>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 28 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 56 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 7 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={styles.horizontalBarGroup}>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 51 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 33 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 10 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 37 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 13 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 58 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 11 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 32 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 10 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 26 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 7 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={styles.horizontalBarGroup}>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 24 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 41 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 41 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={styles.horizontalBarGroup}>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 11 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 7 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 10 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 18 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.top)}*/}
        {/*                style={{ height: 12 }}*/}
        {/*            />*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 41 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 11 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 18 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className={styles.verticalBarGroup}>*/}
        {/*            <div*/}
        {/*                className={clsx(styles.bar, styles.bottom)}*/}
        {/*                style={{ height: 22 }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className={styles.footer}>*/}
        {/*    <span>12</span>*/}
        {/*    <span>16</span>*/}
        {/*    <span>20</span>*/}
        {/*</div>*/}
    </Panel>
)

export default TransactionPanel
