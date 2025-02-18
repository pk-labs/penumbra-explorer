import clsx from 'clsx';
import { Box } from 'lucide-react';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import Panel from '../panel';
import styles from './blockPanel.module.css';
import icon from './blockPanelIcon.svg';

export interface Props {
  className?: ReactNode;
}

const BlockPanel: FC<Props> = props => (
  <Panel
    className={clsx(styles.root, props.className)}
    title={
      <>
        <Image src={icon.src} alt='Current block' width={icon.width} height={icon.height} />
        <span>Current block</span>
      </>
    }
    number={3538663}
    footer='Block time ~12s'
  >
    <div className={styles.chart}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div className={clsx(styles.bar, styles.full)} key={i} />
      ))}
      {Array.from({ length: 13 }).map((_, i) => (
        <div className={styles.bar} key={6 + i} />
      ))}
    </div>
    <div className={styles.footer}>
      <Box size={14} />
      <span>Received new block</span>
      <span>2s</span>
    </div>
  </Panel>
);

export default BlockPanel;
