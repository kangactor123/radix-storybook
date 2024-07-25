import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type SearchValue = string;
type UseTableSearchProps = {
   initialSearch?: SearchValue;
   onChangePage?: (searchValue: SearchValue) => void;
};
type UseTableSearchResult = {
   search: SearchValue;
   setSearch: Dispatch<SetStateAction<SearchValue>>;
   initializeSearch: () => void;
};

const initialState: SearchValue = '';

const useTableSearch = (props?: UseTableSearchProps): UseTableSearchResult => {
   const [search, setSearch] = useState<SearchValue>(props?.initialSearch ?? initialState);

   useEffect(() => {
      if (props && props.onChangePage) {
         props.onChangePage(search);
      }
   }, [search]);

   return {
      search,
      setSearch,
      initializeSearch: () => setSearch(initialState),
   };
};

export type { SearchValue, UseTableSearchProps, UseTableSearchResult };
export { useTableSearch };
