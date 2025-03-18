// istanbul ignore file
import { FC } from 'react'
import { ErrorPage } from '@/components'

const NotFoundPage: FC = () => (
    <ErrorPage message="Page not found" statusCode={404} />
)

export default NotFoundPage
