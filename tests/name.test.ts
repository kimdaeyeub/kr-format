import { describe, it, expect } from "vitest";
import { nameMarking } from "../src/name";

describe("이름 마킹", () => {
  it("이름에 숫자가 포함된 경우", () => {
    expect(() => nameMarking("김대엽123")).toThrow(
      "❌Error: 이름에 숫자, 특수기호, 영어를 포함할 수 없습니다.",
    );
  });
  it("이름에 특수기호가 포함된 경우", () => {
    expect(() => nameMarking("김대엽**#(")).toThrow(
      "❌Error: 이름에 숫자, 특수기호, 영어를 포함할 수 없습니다.",
    );
  });
  it("이름에 영어가 포함된 경우", () => {
    expect(() => nameMarking("김대엽kim")).toThrow(
      "❌Error: 이름에 숫자, 특수기호, 영어를 포함할 수 없습니다.",
    );
  });
  it("이름이 두 글자인 경우", () => {
    expect(nameMarking("이산")).toBe("이*");
  });
  it("이름이 세글자인 경우", () => {
    expect(nameMarking("김대엽")).toBe("김*엽");
  });
  it("이름이 네글자인 경우", () => {
    expect(nameMarking("대한민국")).toBe("대**국");
  });
  it("이름이 다섯글자일 경우", () => {
    expect(nameMarking("방역마스크")).toBe("방***크");
  });
  it("이름이 두 글자인 경우", () => {
    expect(nameMarking("이산", { onlyFamilyName: true })).toBe("이*");
  });
  it("이름이 세글자인 경우", () => {
    expect(nameMarking("김대엽", { onlyFamilyName: true })).toBe("김**");
  });
  it("이름이 네글자인 경우", () => {
    expect(nameMarking("대한민국", { onlyFamilyName: true })).toBe("대***");
  });
  it("이름이 다섯글자일 경우", () => {
    expect(nameMarking("방역마스크", { onlyFamilyName: true })).toBe("방****");
  });
});
