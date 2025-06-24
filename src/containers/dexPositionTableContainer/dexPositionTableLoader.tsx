// istanbul ignore file
import { FC } from 'react'
import { Pagination } from '@/components'
import { getDexLiquidityPositions } from '@/lib/data'
import DexPositionTable from '../../components/tables/dexPositionTable/dexPositionTable'
import { Props } from './dexPositionTableContainer'

const DexPositionTableLoader: FC<Props> = async ({
    limit,
    pagination,
    ...props
}) => {
    const { positions, total } = await getDexLiquidityPositions(limit)

    return (
        <DexPositionTable
            {...props}
            footer={
                pagination ? (
                    <Pagination
                        page={(limit.offset ?? 0) / limit.length + 1}
                        totalPages={Math.ceil(total / limit.length)}
                    />
                ) : undefined
            }
            positions={positions}
        />
    )
}

export default DexPositionTableLoader
