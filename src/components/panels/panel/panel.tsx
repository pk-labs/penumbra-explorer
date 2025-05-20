'use client'

import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import { NumberCountup } from '../../numberCountup'

export interface Props {
    children?: ReactNode
    className?: string
    headerClassName?: string
    number?: number
    numberClassName?: string
    numberPrefix?: ReactNode
    numberSuffix?: ReactNode
    title: ReactNode
    titleClassName?: string
}

const Panel: FC<Props> = props => (
    <section
        className={classNames(
            'bg-other-tonalFill5 flex flex-col justify-between gap-4',
            'rounded-lg p-6 backdrop-blur-lg sm:flex-row',
            props.className
        )}
    >
        <header className={classNames('flex flex-col', props.headerClassName)}>
            <h3
                className={classNames(
                    'text-text-secondary flex items-center gap-2 text-xs',
                    'whitespace-nowrap',
                    props.titleClassName
                )}
            >
                {props.title}
            </h3>
            {typeof props.number === 'number' ? (
                <NumberCountup
                    className={props.numberClassName}
                    number={props.number}
                    prefix={props.numberPrefix}
                    suffix={props.numberSuffix}
                />
            ) : (
                <span
                    className={classNames(
                        'inline-flex items-center font-mono text-3xl',
                        'font-medium',
                        props.numberClassName
                    )}
                >
                    {props.numberPrefix}
                    <span>0</span>
                    {props.numberSuffix}
                </span>
            )}
        </header>
        {props.children && <div className="sm:self-end">{props.children}</div>}
    </section>
)

export default Panel
