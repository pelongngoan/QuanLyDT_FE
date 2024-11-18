import { ColumnDefinitionType } from "./ColumnDefinitionType";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
type TableProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
};

const style = {
  borderCollapse: "collapse",
} as const;

const Table = <T,>({ data, columns }: TableProps<T>): JSX.Element => {
  return (
    <table style={style}>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
};

export default Table;