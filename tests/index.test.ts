import { describe, it, expect } from "vitest";
import KRFormatter from "../src/index";

describe("KRFormatter", () => {
  it("phone", () => {
    expect(KRFormatter.phone("01012345678")).toBe("010-1234-5678");
  });
  it("homePhone", () => {
    expect(KRFormatter.homePhone("021231234", { includeLocalCode: true })).toBe(
      "02-123-1234",
    );
  });
});
