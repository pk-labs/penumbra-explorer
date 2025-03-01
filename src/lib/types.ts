import {
    PartialBlockFragment,
    PartialTransactionFragment,
} from '@/lib/graphql/generated/types'

export interface TransformedPartialBlockFragment extends PartialBlockFragment {
    timeAgo?: string
}

export interface TransformedPartialTransactionFragment
    extends PartialTransactionFragment {
    timeAgo?: string
}
