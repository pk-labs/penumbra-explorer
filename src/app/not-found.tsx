// istanbul ignore file
import { Metadata } from 'next'
import { FC } from 'react'
import { ErrorPage } from '@/components'
import { appName } from '@/lib/constants'

export const metadata: Metadata = {
    title: `Page not found - ${appName}`,
}

const NotFoundPage: FC = () => (
    <ErrorPage message="Page not found" statusCode={404} />
)

export default NotFoundPage
