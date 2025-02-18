import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { Props as TabProps } from './tab';
import styles from './tabs.module.css';

interface Props {
  children?:
    | ReactElement<TabProps>
    | Array<ReactElement<TabProps> | Array<ReactElement<TabProps>> | false | null | undefined>;
  className?: string;
}

const Tabs: FC<Props> = props => (
  <nav className={clsx(styles.root, props.className)}>{props.children}</nav>
);

export default Tabs;
