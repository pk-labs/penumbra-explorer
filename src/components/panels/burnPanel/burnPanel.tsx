import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import NumberPanel from '../numberPanel'
import icon from './burnPanelIcon.png'

interface Props {
    className?: string
    number: number
}

const BurnPanel: FC<Props> = props => (
    <NumberPanel
        className={classNames(
            'bg-transparent bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(193,166,204,0.25)] from-0% to-[rgba(193,166,204,0.03)]',
            'to-100%',
            props.className
        )}
        headerClassName="gap-2"
        number={props.number}
        numberSuffix="UM"
        title={
            <>
                <Image alt="Burn panel" height={24} src={icon} />
                <span>Total burn</span>
            </>
        }
        titleClassName="text-base font-medium"
    />
)

export default BurnPanel
