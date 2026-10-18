import { ColumnDef, tableFeatures, useTable } from "@tanstack/react-table";
const features = tableFeatures({});
export const DataTable = <T extends { id?: string; name?: string }>({
  columns,
  data,
}: {
  columns: Array<ColumnDef<typeof features, T>>;
  data: Array<T>;
}) => {
  const features = tableFeatures({});

  const table = useTable({
    key: "category-table",
    features,
    columns,
    data,
  });

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
