import {
    PartialBlockFragment,
    PartialTransactionFragment,
    TransactionFragment,
} from '@/lib/graphql/generated/types'

export interface TransformedPartialBlockFragment extends PartialBlockFragment {
    timeAgo?: string
}

export interface TransformedTransactionFragment extends TransactionFragment {
    decoded?: Record<string, any>
}

export interface TransformedPartialTransactionFragment
    extends PartialTransactionFragment {
    decoded?: Record<string, any>
    timeAgo?: string
}
