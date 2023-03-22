import clsx from "clsx";
import { PropsWithChildren } from "react";
type BaseProps = PropsWithChildren<{
  className?: string;
}>;

const DescriptionList = ({ children, className }: BaseProps) => {
  return <div className={className}>{children}</div>;
};

const Header = ({ children, className }: BaseProps) => {
  return <div className={className}>{children}</div>;
};

const Title = ({ children, className }: BaseProps) => {
  return (
    <div
      className={clsx(
        "text-base font-semibold leading-6 text-gray-900",
        className
      )}
    >
      {children}
    </div>
  );
};
const Subtitle = ({ children, className }: BaseProps) => {
  return (
    <div className={clsx("mt-1 max-w-2xl text-sm text-gray-500", className)}>
      {children}
    </div>
  );
};

Header.Title = Title;
Header.Subtitle = Subtitle;

const List = ({ children, className }: BaseProps) => {
  return (
    <div className="mt-5 border-t border-gray-200">
      <dl className={clsx("sm:divide-y sm:divide-gray-200", className)}>
        {children}
      </dl>
    </div>
  );
};

const Item = ({ children, className }: BaseProps) => {
  return (
    <div
      className={clsx(
        "py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5",
        className
      )}
    >
      {children}
    </div>
  );
};

const Name = ({ children, className }: BaseProps) => {
  return (
    <dt className={clsx("text-sm font-medium text-gray-500", className)}>
      {children}
    </dt>
  );
};

const Description = ({ children, className }: BaseProps) => {
  return (
    <dd
      className={clsx(
        "mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0",
        className
      )}
    >
      {children}
    </dd>
  );
};
Item.Name = Name;
Item.Description = Description;

export default DescriptionList;
DescriptionList.Header = Header;
DescriptionList.List = List;
DescriptionList.Item = Item;
