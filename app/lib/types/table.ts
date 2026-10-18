export type ColumnDef = {
  id: string;
  name: string;
  type?: "STRING" | "RENDER"
  renderFunction?: Function
};
