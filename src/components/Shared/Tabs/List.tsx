import { Tab } from "@headlessui/react";
import { PropsWithChildren } from "react";

const List = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b border-gray-200">
      <Tab.List as="nav" className="-mb-px flex space-x-4">
        {children}
      </Tab.List>
    </div>
  );
};

export default List;
