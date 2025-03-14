import { FC } from 'react'
import Subsection from '../subsection'
import Action from './action'

interface Props {
    actions: string[]
}

const Actions: FC<Props> = props => (
    <Subsection title="Actions">
        <ul className="flex flex-col gap-2">
            {props.actions.map((action, i) => (
                <Action key={i}>{action}</Action>
            ))}
        </ul>
    </Subsection>
)

export default Actions
