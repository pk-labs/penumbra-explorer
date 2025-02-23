import clsx from 'clsx'
import { FC, ReactElement, ReactNode } from 'react'
import styles from './table.module.css'

export interface Props {
    actions?: ReactNode
    children?:
        | Array<false | ReactElement<HTMLTableSectionElement>>
        | false
        | ReactElement<HTMLTableSectionElement>
    className?: string
    footer?: ReactNode
    footerClassName?: string
    section?: boolean
    title?: string
}

const Table: FC<Props> = props => {
    const Container = props.section ? 'section' : 'div'
    const Header = props.section ? 'header' : 'div'
    const Footer = props.section ? 'footer' : 'div'

    return (
        <Container className={clsx(styles.root, props.className)}>
            {Boolean(props.title || props.actions) && (
                <Header className={styles.header}>
                    <h2 className={styles.title}>{props.title}</h2>
                    <div className={styles.actions}>{props.actions}</div>
                </Header>
            )}
            <table className={styles.table}>{props.children}</table>
            {props.footer && (
                <Footer className={clsx(styles.footer, props.footerClassName)}>
                    {props.footer}
                </Footer>
            )}
        </Container>
    )
}

export default Table
