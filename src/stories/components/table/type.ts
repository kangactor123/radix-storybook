import type { Dispatch, SetStateAction } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Pagination } from "../../../hooks/useTablePagination";
import { RowSelection } from "../../../hooks/useTableSelection";

export type TableUXProps = { message: string };
export type ColDef<T> = ColumnDef<T>;
export type TableProps<T> = {
  data: T[];
  columns: ColDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;

  // Pagination Props
  // Default Value is Server Side Pagination
  usePagination?: boolean; // Default: true
  useClientPagination?: boolean; // Default: false
  pagination?: Pagination;
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  totalCount: number;
  pageSizeOptions?: number[];

  // Select Props
  useSelect?: boolean;
  rowSelection?: RowSelection;
  setRowSelection?: Dispatch<SetStateAction<RowSelection>>;
  useMultiSelect?: boolean;

  // Search Props
  useSearch?: boolean;
  globalFilter?: string;
  setGlobalFilter?: Dispatch<SetStateAction<string>>;
};
