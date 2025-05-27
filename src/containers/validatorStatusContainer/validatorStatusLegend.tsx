import { ArrowDownIcon } from 'lucide-react'
import { FC } from 'react'
import { classNames, formatNumber } from '@/lib/utils'

interface Props {
    lastSignedBlock: number
}

const ValidatorStatusLegend: FC<Props> = props => (
    <div
        className={classNames(
            'text-text-secondary flex items-center justify-between font-mono',
            'text-sm'
        )}
    >
        <span className="inline-flex items-center gap-1">
            <ArrowDownIcon className="inline" size={16} />
            <span>Last block signed</span>
            <span className="text-text-primary ml-1">
                {formatNumber(props.lastSignedBlock)}
            </span>
        </span>
        <span className="inline-flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
                <span
                    className={classNames(
                        'bg-success-light inline-block h-[15px] w-[15px]',
                        'rounded-xs'
                    )}
                />
                Signed
            </span>
            <span className="inline-flex items-center gap-2">
                <span
                    className={classNames(
                        'bg-destructive-light inline-block h-[15px] w-[15px]',
                        'rounded-xs'
                    )}
                />
                Missed
            </span>
            <span className="inline-flex items-center gap-2">
                <span
                    className={classNames(
                        'bg-neutral-main inline-block h-[15px] w-[15px]',
                        'rounded-xs'
                    )}
                />
                Unavailable
            </span>
        </span>
    </div>
)

export default ValidatorStatusLegend
