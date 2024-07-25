import { RowSelectionState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type RowSelection = RowSelectionState;
type UseTableSelectionProps = {
   initialState?: RowSelection;
   onChangePage?: (selection: RowSelection) => void;
};
type UseTableSelectionResult = {
   rowSelection: RowSelection;
   initializeSelection: () => void;
   setRowSelection: Dispatch<SetStateAction<RowSelection>>;
};

const initialState: RowSelection = {};

const useTableSelection = (props?: UseTableSelectionProps): UseTableSelectionResult => {
   const [rowSelection, setRowSelection] = useState<RowSelection>(
      props?.initialState ?? initialState
   );

   useEffect(() => {
      if (props && props.onChangePage) {
         props.onChangePage(rowSelection);
      }
   }, [rowSelection]);

   return {
      rowSelection,
      setRowSelection,
      initializeSelection: () => setRowSelection(initialState),
   };
};

export type { RowSelection, UseTableSelectionProps, UseTableSelectionResult };
export { useTableSelection };
