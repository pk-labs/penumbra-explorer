'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';
import styles from './tabs.module.css';

export interface Props {
  children?: ReactNode;
  href: string;
  label: string;
}

const Tab: FC<Props> = props => {
  const pathname = usePathname();
  const active = props.href === '/' ? pathname === '/' : pathname.startsWith(props.href);

  return (
    <Link href={props.href} className={clsx(styles.tab, active && styles.active)}>
      {props.label}
    </Link>
  );
};

export default Tab;
