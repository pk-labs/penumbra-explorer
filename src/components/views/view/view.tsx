import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

export interface Props {
    children?: ReactNode
    className?: string
    subtitle?: ReactNode | string
    title: string
}

const View: FC<Props> = props => (
    <article
        className={classNames(
            'border-other-tonalStroke flex flex-col gap-4 rounded-lg',
            'border-1 bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(174,174,174,0.25)] from-0%',
            'to-[rgba(174,174,174,0.03)] to-100% p-6 backdrop-blur-md',
            props.className
        )}
    >
        <header className="flex flex-col gap-1">
            <h2 className="text-base font-medium">{props.title}</h2>
            {typeof props.subtitle === 'string' ? (
                <div className="font-mono text-base break-all">
                    {props.subtitle}
                </div>
            ) : (
                props.subtitle
            )}
        </header>
        {props.children}
    </article>
)

export default View
