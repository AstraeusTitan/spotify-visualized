import clsx from "clsx";
import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

type BaseProps = PropsWithChildren<{
  className?: string;
}>;

const ItemList = ({ children, className }: BaseProps) => {
  return (
    <ul role="list" className={clsx("divide-y divide-gray-200", className)}>
      {children}
    </ul>
  );
};

type ItemProps = BaseProps & {
  route?: string;
};
const Item = ({ children, className, route }: ItemProps) => {
  return (
    <li className={clsx("hover:bg-gray-100 group", className)}>
      {!!route ? (
        <Link href={route} className="flex items-center gap-4 p-4 sm:px-6">
          <div className="flex items-center gap-4 flex-wrap flex-grow">
            {children}
          </div>
          <div className="min-w-fit">
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400 group-hover:text-indigo-600"
              aria-hidden="true"
            />
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-4 p-4 sm:px-6 flex-wrap flex-grow">
          {children}
        </div>
      )}
    </li>
  );
};

type ThumbnailProps = {
  className?: string;
  src: string | undefined;
  alt: string | undefined;
};

const Thumbnail = ({ className, src, alt }: ThumbnailProps) => {
  return (
    <div
      className={clsx(
        "relative h-14 w-14 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-300",
        className
      )}
    >
      {!!src && !!alt && <Image src={src || ""} alt={alt || ""} fill />}
    </div>
  );
};
Item.Thumbnail = Thumbnail;

const Title = ({ children, className }: BaseProps) => {
  return (
    <div
      className={clsx(
        "truncate text-sm md:text-base font-semibold md:font-medium text-indigo-600 whitespace-pre-line",
        className
      )}
    >
      {children || <div className="w-32 md:w-48 h-5 bg-gray-300 rounded"></div>}
    </div>
  );
};
Item.Title = Title;

const Subtitle = ({ children, className }: BaseProps) => {
  return (
    <div
      className={clsx(
        "flex text-sm md:text-base text-gray-500 whitespace-pre-line",
        className
      )}
    >
      {children || <div className="w-32 h-5 bg-gray-300 rounded"></div>}
    </div>
  );
};
Item.Subtitle = Subtitle;

type DataBlockProps = BaseProps & {
  label: string | number;
  data?: string | number;
};
const DataBlock = ({ children, className, label, data }: DataBlockProps) => {
  return (
    <div className={clsx("flex flex-col items-center gap-2", className)}>
      <div className="text-sm text-indigo-600 font-semibold md:font-medium">
        {label}
      </div>
      {data !== undefined ? (
        <div className="text-sm md:text-base text-gray-500">{data}</div>
      ) : (
        <div className="w-16 h-5 bg-gray-300 rounded"></div>
      )}
    </div>
  );
};
Item.DataBlock = DataBlock;

const Tag = ({ children, className }: BaseProps) => {
  return (
    <span
      className={clsx(
        "rounded-full w-fit h-fit px-3 py-1 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
};
Item.Tag = Tag;

export default ItemList;
ItemList.Item = Item;
