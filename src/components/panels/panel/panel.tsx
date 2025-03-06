'use client'

import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import NumberCountup from '../../numberCountup'
import styles from './panel.module.css'

export interface Props {
    children?: ReactNode
    className?: ReactNode
    footer?: ReactNode
    number?: number
    numberSuffix?: string
    title: ReactNode
}

const Panel: FC<Props> = props => (
    <section className={clsx(styles.root, props.className)}>
        <header className={styles.header}>
            <h2 className={styles.title}>{props.title}</h2>
            {typeof props.number === 'number' && (
                <NumberCountup
                    number={props.number}
                    suffix={props.numberSuffix}
                />
            )}
        </header>
        {props.children && <div className={styles.chart}>{props.children}</div>}
        {props.footer && (
            <footer className={styles.footer}>{props.footer}</footer>
        )}
    </section>
)

export default Panel
