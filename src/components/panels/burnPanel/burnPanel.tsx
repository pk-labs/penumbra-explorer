import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { Panel } from '../panel'
import icon from './burnPanelIcon.png'

export interface Props {
    className?: string
}

const BurnPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'from-[rgba(193,166,204,0.25)] to-[rgba(193,166,204,0.03)]',
            props.className
        )}
        footer="Average"
        number={86990}
        numberSuffix=" UM"
        title={
            <>
                <Image alt="Total burn" height={24} src={icon} />
                <span>Total burn</span>
            </>
        }
    />
)

export default BurnPanel
