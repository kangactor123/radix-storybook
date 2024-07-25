import { TableUXProps } from '../type';
import styles from './styles.module.css';

const TableEmpty = ({ message }: TableUXProps) => {
   return (
      <div className={styles.tableSubComponentContainer}>
         <div className={styles.emptyTable}>{message}</div>
      </div>
   );
};

export { TableEmpty };
