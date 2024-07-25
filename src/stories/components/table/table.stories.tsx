import { Meta, StoryObj } from "@storybook/react";
import { ColDef, Table } from ".";
import { userEvent, within } from "@storybook/test";
import { useMemo } from "react";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useTableSelection } from "../../../hooks/useTableSelection";
import { useTableSearch } from "../../../hooks/useTableSearch";

type Dummy = {
  name: string;
  age: number;
};

const data: Dummy[] = [
  {
    name: "알리송",
    age: 32,
  },
  { name: "로버트슨", age: 29 },
  { name: "반다이크", age: 31 },
  { name: "코나테", age: 26 },
  { name: "아놀드", age: 26 },
  { name: "맥알리스터", age: 26 },
  { name: "앤도", age: 31 },
  { name: "소보슬라이", age: 23 },
  { name: "루이스디아즈", age: 27 },
  { name: "누녜스", age: 24 },
  { name: "살라", age: 31 },
  { name: "조고메즈", age: 27 },
  { name: "엘리엇", age: 22 },
  { name: "커티스존스", age: 23 },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  // decorators: [
  //    (story) => (
  //       <div style={{ width: '600px', height: '400px', display: 'flex', flexDirection: 'column' }}>
  //          {story()}
  //       </div>
  //    ),
  // ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicColumns: ColDef<Dummy>[] = [
  {
    id: "name",
    header: "이름",
    accessorFn: (row) => row.name,
  },
  { id: "age", header: "나이", accessorFn: (row) => row.age },
];

const basicArgs = {
  data,
  columns: basicColumns as any,
  totalCount: data.length,
};

export const BasicTable: Story = {
  args: basicArgs,
  argTypes: {
    data: {
      description: "테이블에 입력될 데이터 리스트 입니다.",
    },
    columns: {
      description:
        "테이블의 컬럼입니다. <br/>" +
        "- 컴포넌트 내부에 컬럼을 선언할 시 useMemo를 통해 메모이제이션 해주세요.",
    },
    isLoading: {
      description:
        "테이블 데이터가 로딩 중 일때 UX를 위한 boolean 값 입니다. <br />" +
        "- react-query의 <code>isLoading</code>, <code>isFetching</code>을 함께 이용해주세요.",
    },
    emptyMessage: {
      description:
        "빈 테이블의 메세지를 커스텀 할 수 있습니다. 옵션 값 입니다.",
    },
    loadingMessage: {
      description:
        "테이블의 로딩 메세지를 커스텀 할 수 있습니다. 옵션 값 입니다.",
    },
    totalCount: {
      description:
        "테이블의 데이터의 총 갯수 입니다. <br />" +
        "- 서버 사이드 페이지네이션의 경우 서버에서 받아온 totalCount를 넣어주세요.",
    },
    usePagination: {
      description:
        "페이지네이션을 사용할 경우 넣어주는 옵션 값 입니다. <br />" +
        "- 기본 값은 <code>true</code> 입니다.",
    },
    useClientPagination: {
      description:
        "클라이언트 페이지네이션을 사용할 경우 넣어주는 옵션 값 입니다. <br />" +
        "- 기본 값은 <code>false</code> 입니다.",
    },
    pageSizeOptions: {
      description:
        "기본 페이지 사이즈 옵션에 추가하고 싶은 숫자 리스트를 넣어주세요. <br />" +
        "- 예를 들면 <code>[5]</code> 를 넣어주시면 됩니다.",
    },
    pagination: {
      description:
        "<code>useTablePagination</code>에서 리턴받은 pagination 객체를 넣어주세요.",
    },
    setPagination: {
      description:
        "<code>useTablePagination</code>에서 리턴받은 setPagination 객체를 넣어주세요.",
    },
    useSelect: {
      description:
        "행 선택을 사용할 경우 사용하는 옵션 값 입니다. <br />" +
        "- 기본 선택은 싱글 로우 선택입니다. <br />" +
        "- 기본 값은 <code>true</code> 입니다.",
    },
    useMultiSelect: {
      description:
        "멀티 로우 선택을 사용할 경우 사용하는 옵션 값 입니다. <br />" +
        "- 기본 값은 <code>false</code> 입니다. <br />",
    },
    rowSelection: {
      description:
        "<code>useTableSelection</code>에서 리턴받은 rowSelection 객체를 넣어주세요.",
    },
    setRowSelection: {
      description:
        "<code>useTableSelection</code>에서 리턴받은 setRowSelection 객체를 넣어주세요.",
    },
    useSearch: {
      description:
        "검색을 사용할 경우 사용하는 옵션 값 입니다." +
        "- 기본 값은 <code>true</code> 입니다. <br />",
    },
    globalFilter: {
      description:
        "<code>useTableSearch</code>에서 리턴받은 search 객체를 넣어주세요.",
    },
    setGlobalFilter: {
      description:
        "<code>useTableSearch</code>에서 리턴받은 setSearch 객체를 넣어주세요.",
    },
  },
  render: (args) => {
    const { pagination, setPagination } = useTablePagination();
    const { rowSelection, setRowSelection, initializeSelection } =
      useTableSelection();
    const { search, setSearch } = useTableSearch({
      onChangePage: () => {
        initializeSelection();
      },
    });

    return (
      <Table
        {...args}
        pagination={pagination}
        setPagination={setPagination}
        useClientPagination={true}
        pageSizeOptions={[5]}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        globalFilter={search}
        setGlobalFilter={setSearch}
      />
    );
  },
};

export const LoadingTable: Story = {
  args: basicArgs,
  render: (args) => {
    return <Table {...args} isLoading />;
  },
};

export const EmptyTable: Story = {
  args: {
    ...basicArgs,
    data: [],
    totalCount: 0,
  },
  render: (args) => {
    return <Table {...args} />;
  },
};

export const PaginationTable: Story = {
  args: {
    ...basicArgs,
    useClientPagination: true,
    pageSizeOptions: [5],
  },
  render: (args) => {
    const { pagination, setPagination } = useTablePagination();
    return (
      <Table {...args} pagination={pagination} setPagination={setPagination} />
    );
  },
  play: async (params) => {
    const canvas = within(params.canvasElement);
    const select = canvas.getByTestId("page-size-select");

    await userEvent.selectOptions(select, "5", { delay: 300 });
    await userEvent.click(canvas.getByTestId("next-button"), {
      delay: 300,
    });
    await userEvent.click(canvas.getByTestId("prev-button"), {
      delay: 300,
    });
    await userEvent.type(canvas.getByTestId("page-index-input"), "0", {
      delay: 300,
    });
  },
};

export const SearchTable: Story = {
  args: {
    ...basicArgs,
    useSearch: true,
    usePagination: false,
  },
  render: (args) => {
    const { search, setSearch } = useTableSearch();
    return (
      <>
        {args.useSearch && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="search-bar"
          />
        )}
        <Table {...args} globalFilter={search} setGlobalFilter={setSearch} />
      </>
    );
  },
  play: async (params) => {
    const canvas = within(params.canvasElement);
    const searchBar = canvas.getByTestId("search-bar");
    await userEvent.type(searchBar, "반다이크", { delay: 100 });
    await sleep(1500);
    await userEvent.clear(searchBar);
    await userEvent.type(searchBar, "아무것도 없는 키워드", { delay: 100 });
    await sleep(1500);
    await userEvent.clear(searchBar);
  },
};

export const SingleSelectTable: Story = {
  args: {
    ...basicArgs,
    useClientPagination: true,
  },
  render: (args) => {
    const { setRowSelection, rowSelection } = useTableSelection();
    const { pagination, setPagination } = useTablePagination();
    const index = Object.keys(rowSelection).toString();
    return (
      <>
        <p>Select Index: {index || "none"}</p>
        <Table
          {...args}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          pagination={pagination}
          setPagination={setPagination}
        />
      </>
    );
  },
  play: async (params) => {
    const canvas = within(params.canvasElement);
    await userEvent.click(canvas.getByTestId("row-1"));
    await userEvent.click(canvas.getByTestId("next-button"), {
      delay: 300,
    });
    await userEvent.click(canvas.getByTestId("prev-button"), {
      delay: 300,
    });
    await sleep(1500);
    await userEvent.click(canvas.getByTestId("row-2"));
    await sleep(1500);
    await userEvent.click(canvas.getByTestId("row-2")); // 클릭 해제
  },
};

export const MultiSelectTable: Story = {
  args: {
    ...basicArgs,
    useMultiSelect: true,
    usePagination: false,
  },
  render: (args) => {
    const { setRowSelection, rowSelection } = useTableSelection();
    const index = Object.keys(rowSelection).toString();
    const columns: ColDef<Dummy>[] = useMemo(
      () => [
        {
          id: "select",
          header: ({ table }) => (
            <input
              data-testid="select-all"
              type="checkbox"
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              {...{
                disabled: !row.getCanSelect(),
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        ...basicColumns,
      ],
      []
    );

    return (
      <>
        <p>Select Index: {index || "none"}</p>
        <Table
          {...args}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          columns={columns as any}
        />
      </>
    );
  },
  play: async (params) => {
    const canvas = within(params.canvasElement);
    for (let i = 0; i < data.length; i++) {
      const isEven = Math.floor(Math.random() * 11) % 2 === 0;
      if (isEven) await userEvent.click(canvas.getByTestId(`row-${i}`));
      await sleep(200);
    }
    await sleep(1000);
    await userEvent.click(canvas.getByTestId("select-all"));
    await sleep(1000);
    await userEvent.click(canvas.getByTestId("select-all"));
  },
};

export const SortTable: Story = {
  args: basicArgs,
  render: (args) => {
    const { pagination, setPagination } = useTablePagination();
    return (
      <Table {...args} setPagination={setPagination} pagination={pagination} />
    );
  },
  play: async (params) => {
    const canvas = within(params.canvasElement);
    await sleep(500);
    await userEvent.click(canvas.getByTestId(`header-col-label-${0}`));
    await sleep(1000);
    await userEvent.click(canvas.getByTestId(`header-col-label-${1}`));
    await sleep(1000);
    await userEvent.click(canvas.getByTestId(`header-col-label-${0}`));
    await sleep(1000);
    await userEvent.click(canvas.getByTestId(`header-col-label-${0}`));
    await sleep(1000);
    await userEvent.click(canvas.getByTestId(`header-col-label-${0}`));
  },
};
