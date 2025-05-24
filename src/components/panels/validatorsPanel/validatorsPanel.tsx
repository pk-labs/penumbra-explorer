import { FC } from 'react'
import NumberPanel from '../numberPanel'

interface Props {
    className?: string
    number?: number
}

const ValidatorsPanel: FC<Props> = props => (
    <NumberPanel
        className={props.className}
        number={props.number}
        numberSuffix={
            <span className="text-text-secondary text-2xl">/100</span>
        }
        title="Active validators / Validators limit"
    />
)

export default ValidatorsPanel
