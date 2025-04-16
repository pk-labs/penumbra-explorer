'use client'

import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import { NumberCountup } from '../../numberCountup'

export interface Props {
    children?: ReactNode
    className?: string
    footer?: ReactNode
    number?: number | ReactNode
    numberSuffix?: string
    title: ReactNode
}

const Panel: FC<Props> = props => (
    <section
        className={classNames(
            'grid auto-rows-auto grid-cols-1 gap-4 rounded-lg',
            'bg-radial-[100%_100%_at_0%_0%] from-[rgba(174,174,174,0.25)]',
            'from-0% to-[rgba(174,174,174,0.03)] to-100% p-6',
            'backdrop-blur-[32px] sm:grid-cols-2 sm:grid-rows-1 sm:gap-0',
            props.className
        )}
    >
        <header className="flex flex-col gap-2">
            <h2
                className={classNames(
                    'flex items-center gap-2 text-base font-medium',
                    'text-text-secondary whitespace-nowrap capitalize'
                )}
            >
                {props.title}
            </h2>
            {typeof props.number === 'number' ? (
                <NumberCountup
                    number={props.number}
                    suffix={props.numberSuffix}
                />
            ) : (
                props.number
            )}
        </header>
        {props.children && (
            <div
                className={classNames(
                    "[grid-area:'span 2 / 2'] text-text-secondary font-mono",
                    'text-xs font-medium sm:self-end sm:justify-self-end'
                )}
            >
                {props.children}
            </div>
        )}
        {props.footer && (
            <footer
                className={classNames(
                    "[grid-area:'2 / 1'] self-end font-mono text-xs",
                    'text-text-secondary font-medium'
                )}
            >
                {props.footer}
            </footer>
        )}
    </section>
)

export default Panel
