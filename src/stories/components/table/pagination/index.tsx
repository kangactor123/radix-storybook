import React from "react";

import { uniq } from "es-toolkit";
import styles from "./styles.module.css";

export type PaginationProps = {
  page: number;
  size: number;
  totalCount: number;
  totalPageCount?: number;
  pageSizeOption?: number[];
  onClickPrev: () => void;
  onClickNext: () => void;
  onChangePageSize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangePageInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabledNextButton?: boolean;
  disabledPrevButton?: boolean;
};

const defaultOptions = [10, 15, 20, 30, 50, 100, 500];

export const Pagination = (props: PaginationProps) => {
  const {
    page,
    size,
    totalCount,
    totalPageCount = 0,
    pageSizeOption = [],
    disabledPrevButton = false,
    disabledNextButton = false,
  } = props;
  const { onChangePageSize, onChangePageInput, onClickPrev, onClickNext } =
    props;
  const options = uniq(defaultOptions.concat(pageSizeOption)).sort(
    (a, b) => a - b
  );
  const pageIndexLabel = `/ ${
    !totalPageCount
      ? totalCount === 0
        ? 1
        : Math.ceil(totalCount / size)
      : totalPageCount
  }`;

  return (
    <div className={styles.paginationBarWrapper}>
      <div className={styles.pageSizeContainer}>
        <select
          onChange={onChangePageSize}
          value={size}
          className={styles.pageSizeSelector}
          data-testid="page-size-select"
        >
          {options.map((size: number) => {
            return (
              <option key={size} value={size}>
                {size} 건
              </option>
            );
          })}
        </select>
        <span className={styles.totalCount}>총 {totalCount} 건</span>
      </div>
      <div className={styles.pageIndexContainer}>
        <button
          className={styles.iconBtn}
          onClick={onClickPrev}
          disabled={disabledPrevButton}
          data-testid="prev-button"
        >
          <span className={styles.prevButton} />
        </button>
        <div className={styles.pageIndex}>
          <input
            type="number"
            value={page}
            onChange={onChangePageInput}
            data-testid="page-index-input"
          />
          <span>{pageIndexLabel}</span>
        </div>
        <button
          className={styles.iconBtn}
          onClick={onClickNext}
          disabled={disabledNextButton}
          data-testid="next-button"
        >
          <span className={styles.nextButton} />
        </button>
      </div>
    </div>
  );
};
