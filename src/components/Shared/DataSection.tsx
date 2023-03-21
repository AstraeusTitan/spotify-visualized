import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";

const DataSection = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div
      className={clsx("divide-y divide-gray-200 overflow-hidden", className)}
    >
      {children}
    </div>
  );
};

const Header = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div className="px-4 py-5">
      <div className={clsx("flex flex-col", className)}>{children}</div>
    </div>
  );
};

const Title = ({
  children,
  showAll,
}: PropsWithChildren<{
  showAll?: string;
}>) => {
  return (
    <div className="flex items-center justify-between sm:justify-start sm:gap-4">
      <div className="min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {children}
        </h2>
      </div>
      {!!showAll && (
        <div className="flex">
          <Link
            href={showAll}
            className="text-sm font-bold text-gray-600 whitespace-nowrap py-1 px-1 underline hover:text-indigo-600"
          >
            Show all
          </Link>
        </div>
      )}
    </div>
  );
};
Header.Title = Title;

const Panel = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={clsx("px-4 py-5", className)}>{children}</div>;
};

export default DataSection;
DataSection.Header = Header;
DataSection.Panel = Panel;
