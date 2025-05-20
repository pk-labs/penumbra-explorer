import { FC, ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

export const ErrorBoundary: FC<Props> = props => props.children
