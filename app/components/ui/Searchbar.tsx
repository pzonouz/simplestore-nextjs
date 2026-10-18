import { SearchIcon } from "lucide-react";

export const Searchbar = ({ className }: { className?: string }) => {
  return (
    <label
      className={`${className} bg-gray-50 flex items-center gap-2 px-2 rounded-md border-gray-50 border h-14 w-96`}
    >
      <SearchIcon className="text-gray-500" />
      <input
        className="w-full h-full focus-visible:outline-none"
        type="search"
        placeholder="جستجو"
      />
    </label>
  );
};
