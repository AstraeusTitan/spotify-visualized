import clsx from "clsx";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

const Header: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
  ...restProps
}) => {
  const baseClass = "mx-auto max-w-2xl lg:mx-0";
  return (
    <div className={clsx(baseClass, className)} {...restProps}>
      {children}
    </div>
  );
};
const Eyebrow: FC<PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>> = ({
  children,
  className,
  ...restProps
}) => {
  const baseClass = "text-base font-semibold leading-7 text-indigo-600";
  return (
    <p className={clsx(baseClass, className)} {...restProps}>
      {children}
    </p>
  );
};

const Title: FC<PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>> = ({
  children,
  className,
  ...restProps
}) => {
  const baseClass =
    "mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl";
  return (
    <h2 className={clsx(baseClass, className)} {...restProps}>
      {children}
    </h2>
  );
};

const Section = ({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <section className={className} {...restProps}>
      {children}
    </section>
  );
};

export default Section;
Section.Header = Header;
Section.Eyebrow = Eyebrow;
Section.Title = Title;
