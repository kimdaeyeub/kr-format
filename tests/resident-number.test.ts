import { describe, it, expect } from "vitest";
import { mask, residentNumber } from "../src/resident-number";

// 9901011234567 => 9901010-1234567
describe("format 테스트", () => {
  it("-가 포함되어 있을 경우", () => {
    expect(() => residentNumber.format("990101-1234567")).toThrow(
      "❌Error: 올바른 형식이 아닙니다.",
    );
  });
  it("길이가 다를 경우", () => {
    expect(() => residentNumber.format("990101123456")).toThrow(
      "❌Error: 주민번호의 길이가 잘못되었습니다.",
    );
  });
  it("문자열이 포함된 경우", () => {
    expect(() => residentNumber.format("990101asd1234")).toThrow(
      "❌Error: 문자열이 포함되어 있습니다.",
    );
  });
  it("정상적인 경우", () => {
    expect(residentNumber.format("9901011234567")).toBe("990101-1234567");
  });
  it("정상적인 경우", () => {
    expect(residentNumber.format("0001011234567")).toBe("000101-1234567");
  });
});

// 990101-1234567 => 9901011234567
describe("unformat 테스트", () => {
  it("'-'가 포함되지 않은 경우", () => {
    expect(() => residentNumber.unformat("9901011234567")).toThrow(
      "❌Error: 올바른 형식이 아닙니다.",
    );
  });
  it("첫번째 파트의 길이가 잘못되었을 경우", () => {
    expect(() => residentNumber.unformat("99010-1234567")).toThrow(
      "❌Error: 길이가 잘못되었습니다.",
    );
  });
  it("첫번째 파트에 문자열이 포함되었을 경우", () => {
    expect(() => residentNumber.unformat("99010a-1234567")).toThrow(
      "❌Error: 문자가 포함되었습니다.",
    );
  });
  it("두번째 파트의 길이가 잘못되었을 경우", () => {
    expect(() => residentNumber.unformat("990101-123456")).toThrow(
      "❌Error: 길이가 잘못되었습니다.",
    );
  });
  it("두번째 파트에 문자열이 포함되었을 경우", () => {
    expect(() => residentNumber.unformat("990101-12345aa")).toThrow(
      "❌Error: 문자가 포함되었습니다.",
    );
  });
  it("아무 문자열일 경우", () => {
    expect(() => residentNumber.unformat("991!@#12345aa")).toThrow(
      "❌Error: 올바른 형식이 아닙니다.",
    );
  });
  it("정상적인 경우", () => {
    expect(residentNumber.unformat("990101-1234567")).toBe("9901011234567");
  });
});

// 마스킹
describe("마스킹 테스트", () => {
  it("type이 'formatted'인데 해당 형식이 잘못되었을 경우", () => {
    expect(() => mask("9901011234567", { type: "formatted" })).toThrow(
      "❌Error: 올바른 형식이 아닙니다.",
    );
  });
  it("type이 'unformatted'인데 해당 형식이 잘못되었을 경우", () => {
    expect(() => mask("990101-1234567", { type: "unformatted" })).toThrow(
      "❌Error: 올바른 형식이 아닙니다.",
    );
  });
  it("type이 'formatted'일때 정상적인 경우", () => {
    expect(mask("990101-1234567", { type: "formatted" })).toBe(
      "990101-1******",
    );
  });
  it("type이 'unformatted'일때 정상적인 경우", () => {
    expect(mask("9901011234567", { type: "unformatted" })).toBe(
      "9901011******",
    );
  });
});

describe("결합 사용방식", () => {
  it("type이 'formatted'인 경우", () => {
    expect(
      mask(residentNumber.format("9901011234567"), { type: "formatted" }),
    ).toBe("990101-1******");
  });
  it("type이 'unformatted'인 경우", () => {
    expect(
      mask(residentNumber.unformat("990101-1234567"), { type: "unformatted" }),
    ).toBe("9901011******");
  });
});
