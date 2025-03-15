import { FC, ReactNode } from 'react'

export interface Props {
    children?: ReactNode
    name: string
}

const Parameter: FC<Props> = props => (
    <li className="flex items-center justify-between gap-2">
        <span className="capitalize">{props.name}</span>
        <span className="flex-1 border-b border-dashed border-(--surfaceLighter)" />
        <span className="inline-flex items-center gap-1">{props.children}</span>
    </li>
)

export default Parameter
