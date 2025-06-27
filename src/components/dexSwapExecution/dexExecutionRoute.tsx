import { FC, Fragment } from 'react'
import { DexExecutionHop } from '@/lib/types'
import { classNames } from '@/lib/utils'
import AssetValue from '../assetValue'

interface Props {
    hops: DexExecutionHop[]
}

const DexExecutionRoute: FC<Props> = props => (
    <div className="flex items-center">
        {props.hops.map((hop, i) => (
            <Fragment key={i}>
                <span key={i} className="flex items-center">
                    <AssetValue {...hop} density="slim" />
                </span>
                <span
                    className={classNames(
                        'border-t-other-tonalStroke min-w-4 flex-1 border-t-1',
                        'last:hidden'
                    )}
                />
            </Fragment>
        ))}
    </div>
)

export default DexExecutionRoute
