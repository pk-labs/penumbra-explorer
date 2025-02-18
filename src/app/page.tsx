/* istanbul ignore file */
import { Search } from 'lucide-react';
import { FC } from 'react';
import { blocks, transactions } from '../__tests__/__fixtures__';
import {
  BlockPanel,
  BlockTable,
  BurnPanel,
  Button,
  Container,
  TransactionPanel,
  TransactionTable,
} from '../components';
import styles from './page.module.css';

const latestBlocks = blocks.slice(0, 10);
const latestTransactions = transactions.slice(0, 10);

const HomePage: FC = async () => (
  <>
    <Container>
      <h1 className={styles.title}>Penumbra Blockchain Explorer</h1>
      <div className={styles.search}>
        <Search size={16} />
        <span>Search by address, hash number, blocks, etc.</span>
      </div>
    </Container>
    <Container>
      <div className={styles.dashboard}>
        <BlockPanel />
        <TransactionPanel />
        <BurnPanel />
        <BlockTable
          blocks={latestBlocks}
          title='Latest blocks'
          actions={<Button href='/blocks'>View all</Button>}
        />
        <TransactionTable
          transactions={latestTransactions}
          title='Latest transactions'
          actions={<Button href='/transactions'>View all</Button>}
        />
      </div>
    </Container>
  </>
);

export const revalidate = 1;
export default HomePage;
