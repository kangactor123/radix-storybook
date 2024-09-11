// Hooks
export { useTablePagination } from "./hooks/useTablePagination";
export type {
  UseTablePaginationProps,
  UseTablePaginationResult,
  Pagination,
} from "./hooks/useTablePagination";

export { useTableSearch } from "./hooks/useTableSearch";
export type {
  UseTableSearchProps,
  UseTableSearchResult,
  SearchValue,
} from "./hooks/useTableSearch";

export { useTableSelection } from "./hooks/useTableSelection";
export type {
  UseTableSelectionResult,
  UseTableSelectionProps,
  RowSelection,
} from "./hooks/useTableSelection";

export { useAlertDialog } from "./hooks/useAlertDialog";
export type { OpenAlertDialogProps } from "./hooks/useAlertDialog";

// Providers
export {
  AlertDialogProvider,
  AlertDialogContext,
} from "./provider/alert-dialog.provider";
export type { AlertDialogContextProps } from "./provider/alert-dialog.provider";

// Components
export { Dialog } from "./components/dialog";
export type { DialogProps } from "./components/dialog";

export { Table } from "./components/table";
export type { TableProps, ColDef } from "./components/table";

export { Select, MultiSelect } from "./components/select";
export type {
  SelectOption,
  SelectProps,
  MultiSelectProps,
} from "./components/select";

export { AlertDialog } from "./components/alert-dialog";
export type { AlertDialogProps } from "./components/alert-dialog";
