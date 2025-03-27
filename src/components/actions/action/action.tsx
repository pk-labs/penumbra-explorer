import Image from 'next/image'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { encrypted } from '@/lib/images'
import { ActionType } from '@/lib/types'

interface Props {
    // TODO: Implement encrypted flag for icon
    children: ActionType
}

const Action: FC<Props> = props => (
    <li
        className={twMerge(
            'flex items-center gap-2 rounded-lg bg-(--surface) px-3 py-2',
            'font-mono text-sm font-medium text-(--textSecondary)'
        )}
    >
        <Image alt={props.children} src={encrypted} />
        <span className="flex-1">{props.children}</span>
        {![ActionType.spend, ActionType.output].includes(props.children) && (
            <span>Unimplemented</span>
        )}
    </li>
)

export default Action
