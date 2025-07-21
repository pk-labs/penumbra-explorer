import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import NumberPanel from '../numberPanel'
import transactionPanelIcon from './transactionPanelIcon.svg'

interface Props {
    className?: string
    number: number
}

const TransactionPanel: FC<Props> = props => (
    <NumberPanel
        className={classNames(
            'before:bg-transparent before:bg-radial-[100%_100%_at_0%_0%]',
            'before:from-[rgba(244,156,67,0.25)] before:from-0%',
            'before:to-[rgba(244,156,67,0.025)] before:to-100%',
            props.className
        )}
        headerClassName="gap-2"
        number={props.number}
        title={
            <>
                <Image alt="Transaction panel" src={transactionPanelIcon} />
                <span>Total transactions</span>
            </>
        }
        titleClassName="text-base font-medium"
    />
)

export default TransactionPanel
