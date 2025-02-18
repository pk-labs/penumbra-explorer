import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './table.module.css';

interface Props {
  actions?: ReactNode;
  alignLastRight?: boolean;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  footerClassName?: string;
  title?: string;
}

const Table: FC<Props> = props => (
  <section className={clsx(styles.root, props.className)}>
    {Boolean(props.title || props.actions) && (
      <header className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>
        <div className={styles.actions}>{props.actions}</div>
      </header>
    )}
    <table className={clsx(styles.table, props.alignLastRight && styles.alignLastRight)}>
      {props.children}
    </table>
    {props.footer && (
      <footer className={clsx(styles.footer, props.footerClassName)}>{props.footer}</footer>
    )}
  </section>
);

export default Table;
