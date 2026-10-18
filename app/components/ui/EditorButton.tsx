import clsx from "clsx";
import { JSX } from "react";

export const EditorButton = ({
  action,
  icon,
  activation,
}: {
  action: () => void;
  icon: JSX.Element;
  activation: boolean;
}) => {
  return (
    <button
      className={clsx("cursor-pointer border rounded-md", {
        "bg-black rounded-md  text-white": activation,
      })}
      onClick={(e) => {
        e.preventDefault();
        action();
      }}
    >
      {icon}
    </button>
  );
};
