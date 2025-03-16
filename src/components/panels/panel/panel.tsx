'use client'

import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { NumberCountup } from '../../numberCountup'

export interface Props {
    children?: ReactNode
    className?: string
    footer?: ReactNode
    number?: number
    numberSuffix?: string
    title: ReactNode
}

const Panel: FC<Props> = props => (
    <section
        className={twMerge(
            'grid-te grid grid-cols-2 grid-rows-1 rounded-2xl',
            'bg-radial-[100%_100%_at_0%_0%] from-[rgba(174,174,174,0.25)]',
            'from-0% to-[rgba(174,174,174,0.03)] to-100% p-6',
            'backdrop-blur-[32px]',
            props.className
        )}
    >
        <header className="flex flex-col gap-2">
            <h2
                className={twMerge(
                    'flex items-center gap-2 text-base font-medium',
                    'whitespace-nowrap text-(--textSecondary) capitalize'
                )}
            >
                {props.title}
            </h2>
            {typeof props.number === 'number' && (
                <NumberCountup
                    number={props.number}
                    suffix={props.numberSuffix}
                />
            )}
        </header>
        {props.children && (
            <div
                className={twMerge(
                    "[grid-area:'span 2 / 2'] self-end justify-self-end",
                    'overflow-hidden font-mono text-xs font-medium',
                    'text-(--textSecondary)'
                )}
            >
                {props.children}
            </div>
        )}
        {props.footer && (
            <footer
                className={twMerge(
                    "[grid-area:'2 / 1'] self-end font-mono text-xs",
                    'font-medium text-(--textSecondary)'
                )}
            >
                {props.footer}
            </footer>
        )}
    </section>
)

export default Panel
