import styles from './styles.module.css';
import loadingImg from '../../../assets/image/loading.gif';
import { TableUXProps } from '../type';

const TableLoading = ({ message }: TableUXProps) => {
   return (
      <div className={styles.tableSubComponentContainer}>
         <div className={styles.loadingBox}>
            <img src={loadingImg} width="15" height="15" />
            {message}
         </div>
      </div>
   );
};

export { TableLoading };
