import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, PropsWithChildren } from "react";

const BasicTab = ({ children }: PropsWithChildren) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <div
          className={clsx(
            selected
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium"
          )}
        >
          {children}
        </div>
      )}
    </Tab>
  );
};

export default BasicTab;
