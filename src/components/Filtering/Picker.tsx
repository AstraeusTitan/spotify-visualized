import { Popover } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "./Filters";
import { AppliedFilter } from "./helpers";
import Row from "./Row";

const range = (length: number) => new Array(length).fill(0).map((x, i) => i);

type Props = {
  filters?: FilterOptions[];
  onChange?: (afs: AppliedFilter[]) => any;
};

type KeyedAppliedFilter = AppliedFilter & {
  [key: number]: any;
  key: string;
};

const Picker = ({ filters, onChange }: Props) => {
  const [appliedFilters, setAppliedFilters] = useState<KeyedAppliedFilter[]>(
    []
  );
  const [filterCount, setFilterCount] = useState(0);

  const addFilter = () => {
    const nextCount = filterCount + 1;
    setFilterCount(nextCount);
    const nextApplied = [...appliedFilters];
    nextApplied[nextCount] = { key: crypto.randomUUID() } as KeyedAppliedFilter;
    setAppliedFilters(nextApplied);
  };

  const updateFilter = (filter: AppliedFilter, index: number) => {
    console.log("Update Filter");
    let nextApplied = [...appliedFilters];
    nextApplied[index] = { ...nextApplied[index], ...filter };
    setAppliedFilters(nextApplied);
  };

  useEffect(() => {
    console.info("Applied Filters Change", appliedFilters);
  }, [appliedFilters]);

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="flex items-center px-2 py-1 gap-3 font-semibold">
          <span>Filter</span>
          <div>
            {/* filter count goes here */}
            <FunnelIcon className="w-5 h-5" />
          </div>
        </div>
      </Popover.Button>
      <Popover.Panel className="absolute left-1/2 -translate-x-1/2 z-10 flex w-screen max-w-max mt-2">
        <div className="w-screen max-w-md flex overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {range(filterCount).map((n) => (
              <Row
                key={appliedFilters[n].key}
                filters={filters}
                initialState={appliedFilters[n]}
                onChange={(f) => {
                  updateFilter(f, n);
                }}
              />
            ))}
            <button onClick={addFilter}>Add filter</button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default Picker;
