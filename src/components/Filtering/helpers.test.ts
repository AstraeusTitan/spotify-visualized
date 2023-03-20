import { FilterOptions, Filters, FilterTest, Tests } from "./Filters";
import { buildAppliedFilter } from "./helpers";

describe("Filtering Helpers", () => {
  describe("buildAppliedFilter", () => {
    it("should return an object with the correct properties", () => {
      const filter = Filters.energy;
      const test = Tests.isNumber;
      const value = 100;
      const output = buildAppliedFilter(filter, test, value);
      expect(Object.keys(output).sort).toBe(
        ["filter", "test", "value", "matcher"].sort
      );
    });

    it("should return an object with a matcher that is always true when filter or test undefined", () => {
      const filter = Filters.energy;
      const test = Tests.isNumber;
      const value = 100;
      let output = buildAppliedFilter(filter, undefined, value);
      expect(output.matcher()).toBeTruthy();
      output = buildAppliedFilter(undefined, test, value);
      expect(output.matcher()).toBeTruthy();
    });

    it("should return an object with an appropriate matcher", () => {
      // the matcher should expect an object with an 'energy' property and compare it against the value 100
      const filter = Filters.energy;
      const test = Tests.isNumber;
      const value = 100;
      const output = buildAppliedFilter(filter, test, value);
      expect(output.matcher({ energy: 20 })).toBe(false);
      expect(output.matcher({ energy: "100" })).toBe(false);
      expect(output.matcher({ energy: 100 })).toBe(true);
    });
  });
});
