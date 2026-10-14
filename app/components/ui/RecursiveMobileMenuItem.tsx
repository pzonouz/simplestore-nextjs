import { MenuItem } from "@/app/lib/types/menu";

export const RecursiveMobileMenuItem = ({
  menuItem,
}: {
  menuItem: MenuItem;
}) => {
  const hasChildren = menuItem?.children && menuItem?.children?.length > 0;
  return hasChildren ? (
    <li key={menuItem?.title}>
      <details open>
        <summary>{menuItem?.title}</summary>
        <ul>
          {menuItem?.children?.map((item) => (
            <RecursiveMobileMenuItem key={item?.title} menuItem={item} />
          ))}
        </ul>
      </details>
    </li>
  ) : (
    <li key={menuItem?.title}>
      <a href={menuItem?.href}>{menuItem?.title}</a>
    </li>
  );
};
