import { Tests } from "./Filters";

describe("Filters", () => {
  describe("Tests", () => {
    describe("isNumber", () => {
      it("should have a matcher that matches number equality", () => {
        const matcher = Tests.isNumber.matcher;
        expect(matcher(0, 0)).toBe(true);
        expect(matcher(0, 1)).toBe(false);
        expect(matcher(20, 20)).toBe(true);
        expect(matcher(0, -1)).toBe(false);
        expect(matcher("0", 0)).toBe(false);
      });
    });

    describe("isSelect", () => {
      it("should have a matcher that matches string equality", () => {
        const matcher = Tests.isSelect([
          { name: "0", value: "0" },
          { name: "1", value: "1" },
        ]).matcher;
        expect(matcher("0", "0")).toBe(true);
        expect(matcher("0", "1")).toBe(false);
        expect(matcher("20", "20")).toBe(true);
        expect(matcher("0", "-1")).toBe(false);
        expect(matcher(0, "0")).toBe(false);
      });
    });

    describe("isGreater", () => {
      it("should have a matcher that matches number is greater than", () => {
        const matcher = Tests.isGreater.matcher;
        expect(matcher(0, 0)).toBe(false);
        expect(matcher(0, 1)).toBe(false);
        expect(matcher(1, 0)).toBe(true);
        expect(matcher(20, 20)).toBe(false);
        expect(matcher(0, -1)).toBe(true);
      });
    });

    describe("isLess", () => {
      it("should have a matcher that matches number is less than", () => {
        const matcher = Tests.isLess.matcher;
        expect(matcher(0, 0)).toBe(false);
        expect(matcher(0, 1)).toBe(true);
        expect(matcher(1, 0)).toBe(false);
        expect(matcher(0, 20)).toBe(true);
        expect(matcher(20, 20)).toBe(false);
        expect(matcher(0, -1)).toBe(false);
      });
    });

    describe("isSet", () => {
      it("should have a matcher that matches a not undefined value", () => {
        const matcher = Tests.isSet.matcher;
        expect(matcher(0)).toBe(true);
        expect(matcher(undefined)).toBe(false);
        expect(matcher(null)).toBe(true);
        expect(matcher("")).toBe(true);
        expect(matcher([])).toBe(true);
        expect(matcher({})).toBe(true);
      });
    });

    describe("isUnset", () => {
      it("should have a matcher that matches an undefined value", () => {
        const matcher = Tests.isUnset.matcher;
        expect(matcher(0)).toBe(false);
        expect(matcher(undefined)).toBe(true);
        expect(matcher(null)).toBe(false);
        expect(matcher("")).toBe(false);
        expect(matcher([])).toBe(false);
        expect(matcher({})).toBe(false);
      });
    });

    describe("startsWith", () => {
      it("should have a matcher that matches a string that starts with target string", () => {
        const matcher = Tests.startsWith.matcher;
        expect(matcher("test", "t")).toBe(true);
        expect(matcher("test", "test")).toBe(true);
        expect(matcher("test", "st")).toBe(false);
      });
    });

    describe("endsWith", () => {
      it("should have a matcher that matches a string that ends with target string", () => {
        const matcher = Tests.endsWith.matcher;
        expect(matcher("test", "t")).toBe(true);
        expect(matcher("test", "test")).toBe(true);
        expect(matcher("test", "st")).toBe(true);
        expect(matcher("test", "te")).toBe(false);
      });
    });

    describe("contains", () => {
      it("should have a matcher that matches a string that contains the target string", () => {
        const matcher = Tests.contains.matcher;
        expect(matcher("test", "t")).toBe(true);
        expect(matcher("test", "test")).toBe(true);
        expect(matcher("test", "st")).toBe(true);
        expect(matcher("test", "te")).toBe(true);
        expect(matcher("test", "bob")).toBe(false);
        expect(matcher("test", "testing")).toBe(false);
      });
    });
  });
});
