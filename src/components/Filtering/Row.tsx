import { useEffect, useState } from "react";
import { FilterOptions, FilterTest } from "./Filters";
import { AppliedFilter, buildAppliedFilter } from "./helpers";

type Props = {
  filters?: FilterOptions[];
  onChange?: (f: AppliedFilter) => any;
  initialState?: AppliedFilter;
};

const Row = ({ filters, onChange, initialState }: Props) => {
  const [filter, setFilter] = useState<FilterOptions | undefined>(
    initialState?.filter
  );
  const [test, setTest] = useState<FilterTest | undefined>(initialState?.test);
  const [value, setValue] = useState(initialState?.value);

  useEffect(() => {
    const appliedFilter = buildAppliedFilter(filter, test, value);
    !!onChange && onChange(appliedFilter);
  }, [filter, onChange, test, value]);

  return (
    <div className="flex px-4 py-2 sm:items-center gap-x-4">
      <div>When</div>
      <div className="flex flex-grow flex-col sm:flex-row items-start gap-x-4 gap-y-2">
        <div className="w-full sm:w-48">
          <select
            name="field"
            id="field"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={filter?.name}
            onChange={(e) => {
              const filter = filters?.find((f) => f.name === e.target.value);
              setFilter(filter);
              setTest(filter?.tests[0]);
            }}
          >
            <option className="hidden">Select Field</option>
            {filters?.map((filter, i) => (
              <option key={i} value={filter.name}>
                {filter.name}
              </option>
            ))}
          </select>
        </div>
        {!!filter && (
          <>
            <div className="w-full sm:w-48">
              <select
                name="test"
                id="test"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={initialState?.test?.name || test?.name}
                onChange={(e) => {
                  setTest(filter?.tests.find((t) => t.name === e.target.value));
                }}
              >
                {filter?.tests.map((test, i) => (
                  <option key={`${filter.name}_${i}`} value={test.name}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>
            {!!test &&
              !!test.value &&
              test.value.component({
                defaultValue: value,
                onChange: (value: any) => (
                  console.log("Value", value), setValue(value)
                ),
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Row;
