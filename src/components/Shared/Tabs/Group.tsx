import { Tab } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

const Group = ({ children }: PropsWithChildren) => {
  return (
    <Tab.Group as={Fragment} defaultIndex={0}>
      {children}
    </Tab.Group>
  );
};

export default Group;
