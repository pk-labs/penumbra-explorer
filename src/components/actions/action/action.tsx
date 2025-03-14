import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import { encrypted } from '@/lib/images'

interface Props {
    // TODO: Implement encrypted flag for icon
    children: string
}

const Action: FC<Props> = props => (
    <li
        className={clsx(
            'flex items-center gap-2 rounded-lg bg-(--surface) px-3 py-2',
            'font-mono text-sm font-medium text-(--textSecondary)'
        )}
    >
        <Image alt={props.children} src={encrypted} />
        {props.children}
    </li>
)

export default Action
