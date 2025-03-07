import {
    PartialBlockFragment,
    PartialTransactionFragment,
    TransactionFragment,
} from '@/lib/graphql/generated/types'

export interface TransformedPartialBlockFragment extends PartialBlockFragment {
    timeAgo?: string
}

export interface TransformedTransactionFragment extends TransactionFragment {
    decoded?: object
}

export interface TransformedPartialTransactionFragment
    extends PartialTransactionFragment {
    timeAgo?: string
}
