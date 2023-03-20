import { FilterOptions, FilterTest } from "./Filters";

export type AppliedFilter = {
  filter: FilterOptions | undefined;
  test: FilterTest | undefined;
  value?: any | undefined;
  matcher: Function;
};

export const buildAppliedFilter = (
  filter: FilterOptions | undefined,
  test: FilterTest | undefined,
  value: any | undefined
): AppliedFilter => {
  let matcher;
  if (!filter || !test) {
    // If a filter or test is not defined, then the filter is not complete and should not filter anything
    matcher = () => true;
  } else {
    matcher = (obj: any) => {
      const checkValue = filter?.get
        ? filter?.get(obj)
        : obj[filter?.field || ""];
      return test?.matcher(checkValue, value);
    };
  }
  return {
    filter: filter,
    test: test,
    value: value,
    matcher: matcher,
  };
};
