'use client'

import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import { NumberCountup } from '../../numberCountup'

export interface Props {
    children?: ReactNode
    className?: string
    headerClassName?: string
    number?: number | ReactNode // TODO: Refactor to number only and show 0 instead of loading skeleton
    numberPrefix?: string
    numberSuffix?: string
    title: ReactNode
}

const Panel: FC<Props> = props => (
    <section
        className={classNames(
            'bg-other-tonalFill5 flex flex-col justify-between gap-4 rounded-lg p-6 backdrop-blur-lg',
            'sm:flex-row',
            props.className
        )}
    >
        <header
            className={classNames('flex flex-col gap-2', props.headerClassName)}
        >
            <h3
                className={classNames(
                    'flex items-center gap-2 text-base font-medium',
                    'text-text-secondary whitespace-nowrap'
                )}
            >
                {props.title}
            </h3>
            {typeof props.number === 'number' ? (
                <NumberCountup
                    number={props.number}
                    prefix={props.numberPrefix}
                    suffix={props.numberSuffix}
                />
            ) : (
                props.number
            )}
        </header>
        {props.children && <div className="sm:self-end">{props.children}</div>}
    </section>
)

export default Panel
