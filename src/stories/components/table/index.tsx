import React, { useEffect, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import classNames from "classnames/bind";

import styles from "./styles.module.css";
import { TableLoading } from "./loading";
import { TableEmpty } from "./empty";
import { Pagination } from "./pagination";

import { EMPTY_TABLE_MESSAGE, LOADING_TABLE_MESSAGE } from "./constant";
import { TableProps, ColDef } from "./type";

const cx = classNames.bind(styles);

function Table<T>(props: TableProps<T>) {
  const {
    data,
    columns,
    pagination,
    pageSizeOptions,
    totalCount,
    isLoading = false,
    setPagination,
    usePagination = true,
    useClientPagination = false,
    useSelect = true,
    useMultiSelect = false,
    rowSelection = {},
    setRowSelection,
    useSearch = true,
    globalFilter,
    setGlobalFilter,
    emptyMessage = EMPTY_TABLE_MESSAGE,
    loadingMessage = LOADING_TABLE_MESSAGE,
  } = props;
  const isEmptyTable = data.length === 0;
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const [hasScroll, setHasScroll] = useState(false);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      ...(usePagination && {
        pagination: {
          pageIndex: pagination?.pageIndex ?? 0,
          pageSize: pagination?.pageSize ?? 0,
        },
      }),
      ...(useSelect && {
        rowSelection,
      }),
      ...(useSearch && {
        globalFilter,
      }),
    },
    // Pagination API
    ...(usePagination && {
      ...(useClientPagination
        ? {
            getPaginationRowModel: getPaginationRowModel(),
          }
        : {
            manualPagination: true,
            rowCount: totalCount,
          }),
      onPaginationChange: setPagination,
    }),
    // Selection API
    ...(useSelect && {
      enableRowSelection: useSelect,
      onRowSelectionChange: setRowSelection,
    }),
    // Search API
    ...(useSearch && {
      getFilteredRowModel: getFilteredRowModel(),
      onGlobalFilterChange: setGlobalFilter,
    }),
  });

  const {
    setPageIndex,
    setPageSize,
    previousPage,
    nextPage,
    getHeaderGroups,
    getRowModel,
    getState,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
  } = table;
  const rows = getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    estimateSize: () => 30,
    getScrollElement: () => bodyRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const onChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+event.target.value);
  };

  const onChangePageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = event.target.value ? +event.target.value - 1 : 0;
    setPageIndex(page);
  };

  const onSelectChange = (row: Row<T>) => (event: unknown) => {
    const eventHandler = row.getToggleSelectedHandler();
    if (!useMultiSelect) {
      const isSelectedId = rowSelection[row.id] ?? false;
      if (!isSelectedId) {
        setRowSelection && setRowSelection({});
      }
      return eventHandler(event);
    }
    eventHandler(event);
  };

  useEffect(() => {
    // Tracking Table Body Height
    // Cause of Setting Table Header Container Size
    const element = bodyRef.current;
    if (!element) return;

    const updateHeight = () => {
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const hasScroll = scrollHeight > clientHeight;
      setHasScroll(hasScroll);
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeaderViewport}>
        <div
          className={styles.tableHeaderContainer}
          style={{ width: `calc(100% - ${hasScroll ? 7 : 0}px)` }}
        >
          {getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className={styles.headerGroup}>
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className={cx(styles.headerCell, styles.tableCell)}
                  style={{ width: header.getSize() }}
                >
                  <span
                    onClick={header.column.getToggleSortingHandler()}
                    data-testid={`header-col-label-${header.index}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                  {header.column.getIsSorted() ? (
                    <span
                      onClick={header.column.getToggleSortingHandler()}
                      className={cx(styles.sortIcon, {
                        sortAsc: header.column.getIsSorted() === "asc",
                      })}
                    />
                  ) : null}
                  <div
                    className={styles.resizer}
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        ref={bodyRef}
        className={cx(styles.tableBodyViewport, styles.virtualizedTableBody)}
      >
        {isLoading ? (
          <TableLoading message={loadingMessage} />
        ) : isEmptyTable ? (
          <TableEmpty message={emptyMessage} />
        ) : (
          <div className={styles.tableBody}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<T>;
              return (
                <div
                  key={row.id}
                  data-testid={`row-${row.id}`}
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  onClick={onSelectChange(row)}
                  className={cx(styles.tableRow, {
                    tableRowSelected: row.getIsSelected(),
                  })}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      className={styles.tableCell}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {usePagination ? (
        <Pagination
          pageSizeOption={pageSizeOptions}
          totalCount={totalCount}
          onChangePageInput={onChangePageInput}
          onChangePageSize={onChangePageSize}
          onClickNext={() => nextPage()}
          onClickPrev={() => previousPage()}
          totalPageCount={getPageCount()}
          page={getState().pagination.pageIndex + 1}
          size={getState().pagination.pageSize}
          disabledNextButton={!getCanNextPage()}
          disabledPrevButton={!getCanPreviousPage()}
        />
      ) : null}
    </div>
  );
}

export { Table };
export type { TableProps, ColDef };
