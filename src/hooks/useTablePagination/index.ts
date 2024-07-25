import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Pagination = PaginationState;
type UseTablePaginationProps = {
   initialState?: Pagination;
   onChangePage?: (pagination: Pagination) => void;
};
type UseTablePaginationResult = {
   pagination: Pagination;
   setPagination: Dispatch<SetStateAction<Pagination>>;
   initializePagination: () => void;
};

const initialState: Pagination = {
   pageIndex: 0,
   pageSize: 10,
};

const useTablePagination = (props?: UseTablePaginationProps): UseTablePaginationResult => {
   const [pagination, setPagination] = useState<Pagination>(props?.initialState ?? initialState);

   useEffect(() => {
      if (props && props.onChangePage) {
         props.onChangePage(pagination);
      }
   }, [pagination]);

   return {
      pagination,
      setPagination,
      initializePagination: () => setPagination(initialState),
   };
};

export type { Pagination, UseTablePaginationProps, UseTablePaginationResult };
export { useTablePagination };
