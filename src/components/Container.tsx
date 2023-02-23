import { FC, ReactNode, PropsWithChildren, HTMLAttributes } from "react";
import { clsx } from "clsx";

const Outer: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
}) => {
  const baseClasses = "mx-auto max-w-7xl sm:px-8 lg:px-8";
  return <div className={clsx(baseClasses, className)}>{children}</div>;
};

const Inner: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
}) => {
  const baseClasses = "mx-auto max-w-2xl lg:max-w-5xl px-4 sm:px-8 lg:px-12";
  return <div className={clsx(baseClasses, className)}>{children}</div>;
};

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <Outer>
      <Inner>{children}</Inner>
    </Outer>
  );
};

Container.Outer = Outer;
Container.Inner = Inner;
