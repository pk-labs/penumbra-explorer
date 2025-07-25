import { FC, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    name: string
}

const Parameter: FC<Props> = props => (
    <li className="flex items-center justify-between gap-2">
        <span className="whitespace-nowrap">{props.name}</span>
        <span className="border-other-tonal-fill10 flex-1 border-b border-dashed" />
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
            {props.children}
        </span>
    </li>
)

export default Parameter
