import { describe, it, expect } from "vitest";
import { nameMarking } from "../src/name";

describe("이름 마킹", () => {
  it("이름이 비어 있는 경우", () => {
    expect(() => nameMarking("")).toThrow("이름 오류: 이름을 입력해 주세요.");
  });
  it("이름에 숫자가 포함된 경우", () => {
    expect(() => nameMarking("김대엽123")).toThrow(
      "이름 오류: 숫자, 특수문자, 영문은 사용할 수 없습니다.",
    );
  });
  it("이름에 특수기호가 포함된 경우", () => {
    expect(() => nameMarking("김대엽**#(")).toThrow(
      "이름 오류: 숫자, 특수문자, 영문은 사용할 수 없습니다.",
    );
  });
  it("이름에 영어가 포함된 경우", () => {
    expect(() => nameMarking("김대엽kim")).toThrow(
      "이름 오류: 숫자, 특수문자, 영문은 사용할 수 없습니다.",
    );
  });
  it("이름이 한 글자인 경우", () => {
    expect(nameMarking("김")).toBe("*");
  });
  it("이름이 한 글자이고 성만 표시하는 경우", () => {
    expect(nameMarking("김", { onlyFamilyName: true })).toBe("김");
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
