'use client';
import { MouseEvent, useCallback, useMemo } from 'react';

import {
  EnhancedTable,
  Grid,
  useTableDataPagination,
} from '@rosen-bridge/ui-kit';

import { MobileRow, TabletRow, mobileHeader, tabletHeader } from './TableRow';
import TableSkeleton from './TableSkeleton';

import { ApiRevenueResponse, Revenue } from '@/_types/api';

const getKey = (offset: number, limit: number) => {
  return ['/revenue', { offset, limit }];
};

const Revenues = () => {
  const {
    data,
    isLoading,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    isFirstLoad,
  } = useTableDataPagination<ApiRevenueResponse>(getKey);

  const handleChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPageIndex(newPage);
    },
    [setPageIndex]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPageSize(parseInt(event.target.value, 10));
    },
    [setPageSize]
  );

  const renderMobileRow = useCallback(
    (rowData: Revenue) => <MobileRow {...rowData} isLoading={isLoading} />,
    [isLoading]
  );

  const renderTabletRow = useCallback(
    (rowData: Revenue) => <TabletRow {...rowData} isLoading={isLoading} />,
    [isLoading]
  );

  const tableHeaderProps = useMemo(
    () => ({
      mobile: mobileHeader,
      tablet: tabletHeader,
    }),
    []
  );

  const tableRenderRowProps = useMemo(
    () => ({
      mobile: renderMobileRow,
      tablet: renderTabletRow,
    }),
    [renderMobileRow, renderTabletRow]
  );

  const paginationProps = useMemo(
    () => ({
      rowsPerPageOptions: [5, 10, 25],
      component: 'div',
      count: data?.total ?? 0,
      rowsPerPage: pageSize,
      page: pageIndex,
      onPageChange: handleChangePage,
      onRowsPerPageChange: handleChangeRowsPerPage,
      nextIconButtonProps: {
        disabled: isLoading,
      },
    }),
    [
      data?.total,
      pageIndex,
      pageSize,
      handleChangePage,
      handleChangeRowsPerPage,
      isLoading,
    ]
  );

  return isFirstLoad ? (
    <Grid>
      <TableSkeleton numberOfItems={pageSize} />
    </Grid>
  ) : (
    data && (
      <Grid container>
        <EnhancedTable
          data={data.items}
          responsiveHead={tableHeaderProps}
          responsiveRenderRow={tableRenderRowProps}
          paginated={true}
          tablePaginationProps={paginationProps}
        />
      </Grid>
    )
  );
};

export default Revenues;
