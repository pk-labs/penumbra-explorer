import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { NumberPanel } from '../numberPanel'
import transactionPanelIcon from './transactionPanelIcon.svg'

interface Props {
    className?: string
    number: number
}

const TransactionPanel: FC<Props> = props => (
    <NumberPanel
        className={classNames(
            'bg-transparent bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(244,156,67,0.25)] from-0% to-[rgba(244,156,67,0.025)]',
            'to-100%',
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
