import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Props {
    children?: ReactNode
    className?: string
    subtitle?: string
    title: string
}

const View: FC<Props> = props => (
    <article
        className={twMerge(
            'flex flex-col gap-4 rounded-2xl border-1',
            'border-(--surfaceLighter) bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(174,174,174,0.25)]',
            'from-0% to-[rgba(174,174,174,0.025)] to-100% p-6 backdrop-blur-lg',
            props.className
        )}
    >
        <header className="flex flex-col gap-1">
            <h2 className="text-base font-medium capitalize">{props.title}</h2>
            {props.subtitle && (
                <div className="font-mono text-base break-all">
                    {props.subtitle}
                </div>
            )}
        </header>
        {props.children}
    </article>
)

export default View
