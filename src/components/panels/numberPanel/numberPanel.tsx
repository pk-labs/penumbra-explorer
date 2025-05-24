'use client'

import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import { NumberCountup } from '../../numberCountup'
import { Panel, PanelProps } from '../panel'

export interface Props extends Omit<PanelProps, 'header'> {
    number: number
    numberClassName?: string
    numberPrefix?: ReactNode
    numberSuffix?: ReactNode
}

const NumberPanel: FC<Props> = ({
    number,
    numberClassName,
    numberPrefix,
    numberSuffix,
    ...props
}) => (
    <Panel
        header={
            number > 0 ? (
                <NumberCountup
                    className={numberClassName}
                    number={number}
                    prefix={numberPrefix}
                    suffix={numberSuffix}
                />
            ) : (
                <span
                    className={classNames(
                        'inline-flex items-center font-mono text-3xl',
                        'font-medium',
                        numberClassName
                    )}
                >
                    {numberPrefix}
                    <span>0</span>
                    {numberSuffix}
                </span>
            )
        }
        {...props}
    />
)

export default NumberPanel
