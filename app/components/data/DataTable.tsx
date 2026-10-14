import { ColumnDef } from "@/app/lib/types/table";
import { TableActions } from "./TableActions";

export const DataTable = <T extends { id?: string; name?: string }>({
  columns,
  data,
}: {
  columns: ColumnDef[];
  data: T[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {columns?.map((column) => (
              <th key={column?.id}>{column?.name}</th>
            ))}
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.map((item) => (
            <tr key={item?.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              {columns?.map((col) => (
                <td key={col?.id}>{item[col.id]}</td>
              ))}

              <th>
                <TableActions id={item["id"]} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
