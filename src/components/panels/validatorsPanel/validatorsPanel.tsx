import { FC } from 'react'
import Panel from '../panel'

interface Props {
    className?: string
    number?: number
}

const ValidatorsPanel: FC<Props> = props => (
    <Panel
        className={props.className}
        number={props.number}
        numberSuffix={
            <span className="text-text-secondary text-2xl">/100</span>
        }
        title="Active validators / Validators limit"
    />
)

export default ValidatorsPanel
