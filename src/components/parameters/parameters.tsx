import { FC } from 'react'
import { TransactionFragment } from '@/lib/graphql/generated/types'
import { DataList, DataListItem } from '../dataList'
import Subsection from '../subsection'

interface Props {
    parameters: TransactionFragment['body']['parameters']
}

const Parameters: FC<Props> = props => (
    <Subsection title="Parameters">
        <DataList>
            <DataListItem name="Transaction fee">
                {Number(props.parameters.fee.amount) / 1000} UM
            </DataListItem>
            <DataListItem name="Chain ID">
                {props.parameters.chainId}
            </DataListItem>
        </DataList>
    </Subsection>
)

export default Parameters
