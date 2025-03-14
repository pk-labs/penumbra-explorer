import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { Children, FC, ReactElement } from 'react'
import { BreadcrumbProps } from './breadcrumb'

interface Props {
    children?:
        | Array<
              | Array<ReactElement<BreadcrumbProps>>
              | false
              | null
              | ReactElement<BreadcrumbProps>
              | undefined
          >
        | ReactElement<BreadcrumbProps>
    className?: string
}

const Breadcrumbs: FC<Props> = props => {
    const lastIndex = Children.count(props.children) - 1

    return (
        <nav className={clsx('mb-4 flex items-center gap-2', props.className)}>
            {Children.map(props.children, (child, index) => (
                <>
                    {child}
                    {index < lastIndex && (
                        <ChevronRight
                            className="text-(--textSecondary)"
                            size={24}
                        />
                    )}
                </>
            ))}
        </nav>
    )
}

export default Breadcrumbs
