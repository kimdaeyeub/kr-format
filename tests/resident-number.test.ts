import { describe, it, expect } from "vitest";
import { mask, residentNumber } from "../src/resident-number";

// 9901011234567 => 990101-1234567
describe("format 테스트", () => {
  it("-가 포함되어 있을 경우", () => {
    expect(() => residentNumber.format("990101-1234567")).toThrow(
      "주민등록번호 오류: 하이픈 없이 숫자만 입력해 주세요.",
    );
  });
  it("길이가 다를 경우", () => {
    expect(() => residentNumber.format("990101123456")).toThrow(
      "주민등록번호 오류: 숫자 13자리여야 합니다.",
    );
  });
  it("문자열이 포함된 경우", () => {
    expect(() => residentNumber.format("990101asd1234")).toThrow(
      "주민등록번호 오류: 숫자만 입력할 수 있습니다.",
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
      "주민등록번호 오류: 6자리-7자리 형식이어야 합니다.",
    );
  });
  it("첫번째 파트의 길이가 잘못되었을 경우", () => {
    expect(() => residentNumber.unformat("99010-1234567")).toThrow(
      "주민등록번호 오류: 앞부분은 숫자 6자리여야 합니다.",
    );
  });
  it("첫번째 파트에 문자열이 포함되었을 경우", () => {
    expect(() => residentNumber.unformat("99010a-1234567")).toThrow(
      "주민등록번호 오류: 앞부분은 숫자만 입력할 수 있습니다.",
    );
  });
  it("두번째 파트의 길이가 잘못되었을 경우", () => {
    expect(() => residentNumber.unformat("990101-123456")).toThrow(
      "주민등록번호 오류: 뒷부분은 숫자 7자리여야 합니다.",
    );
  });
  it("두번째 파트에 문자열이 포함되었을 경우", () => {
    expect(() => residentNumber.unformat("990101-12345aa")).toThrow(
      "주민등록번호 오류: 뒷부분은 숫자만 입력할 수 있습니다.",
    );
  });
  it("아무 문자열일 경우", () => {
    expect(() => residentNumber.unformat("991!@#12345aa")).toThrow(
      "주민등록번호 오류: 6자리-7자리 형식이어야 합니다.",
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
      "주민등록번호 오류: 마스킹은 000000-0000000 형식이어야 합니다.",
    );
  });
  it("type이 'unformatted'인데 해당 형식이 잘못되었을 경우", () => {
    expect(() => mask("990101-1234567", { type: "unformatted" })).toThrow(
      "주민등록번호 오류: 마스킹은 하이픈 없는 숫자 13자리여야 합니다.",
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
