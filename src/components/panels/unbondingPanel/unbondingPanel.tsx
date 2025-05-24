import { FC } from 'react'
import NumberPanel from '../numberPanel'

interface Props {
    className?: string
    number?: number
}

const UnbondingPanel: FC<Props> = props => (
    <NumberPanel
        className={props.className}
        number={props.number}
        numberPrefix="~"
        numberSuffix={<span className="ml-2">days</span>}
        title="Unbonding delay"
    />
)

export default UnbondingPanel
