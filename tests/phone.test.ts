import { describe, it, expect } from "vitest";
import { formatHomePhone, formatPhone } from "../src/phone";

describe("phoneNumber", () => {
  it("한국식 휴대전화 형태로 포멧", () => {
    expect(formatPhone("01012345678")).toBe("010-1234-5678");
  });
  it("폰번호 형식보다 짧은 경우", () => {
    expect(() => formatPhone("12")).toThrow(
      new Error("휴대전화번호 오류: 11자리보다 짧습니다."),
    );
  });
  it("폰번호 형식보다 긴 경우", () => {
    expect(() => formatPhone("12345678901234567890")).toThrow(
      "휴대전화번호 오류: 11자리보다 깁니다.",
    );
  });
  it("폰번호 형식이 아닌 경우", () => {
    expect(() => formatPhone("abasaadsaadc")).toThrow(
      new Error("휴대전화번호 오류: 숫자만 입력할 수 있습니다."),
    );
  });
});

describe("homeNumber", () => {
  it("지역번호 미포함", () => {
    expect(formatHomePhone("1231234", { includeLocalCode: false })).toBe(
      "123-1234",
    );
  });
  it("지역번호 미포함/잘못된 문자열일 경우", () => {
    expect(() => formatHomePhone("abc", { includeLocalCode: false })).toThrow(
      new Error("유선전화번호 오류: 숫자만 입력할 수 있습니다."),
    );
  });
  it("지역번호 미포함/번호가 너무 길 경우", () => {
    expect(() =>
      formatHomePhone("12345678901", { includeLocalCode: false }),
    ).toThrow(
      new Error(
        "유선전화번호 오류: 지역번호 없이 입력할 때는 7자리여야 하는데 깁니다.",
      ),
    );
  });
  it("지역번호 미포함/번호가 너무 짧을 경우", () => {
    expect(() => formatHomePhone("12345", { includeLocalCode: false })).toThrow(
      new Error(
        "유선전화번호 오류: 지역번호 없이 입력할 때는 7자리여야 하는데 짧습니다.",
      ),
    );
  });

  it("지역번호 포함/잘못된 문자열일 경우", () => {
    expect(() => formatHomePhone("abc", { includeLocalCode: true })).toThrow(
      new Error("유선전화번호 오류: 숫자만 입력할 수 있습니다."),
    );
  });

  it("지역번호가 서울일 경우", () => {
    expect(formatHomePhone("021231234", { includeLocalCode: true })).toBe(
      "02-123-1234",
    );
  });
  it("지역번호가 서울이 아닐 경우", () => {
    expect(formatHomePhone("0531231234", { includeLocalCode: true })).toBe(
      "053-123-1234",
    );
  });
  it("없는 지역번호일 경우", () => {
    expect(() =>
      formatHomePhone("0101234567", { includeLocalCode: true }),
    ).toThrow(new Error("유선전화번호 오류: 알 수 없는 지역번호입니다."));
  });
  it("지역번호가 서울이고 번호가 너무 길 경우", () => {
    expect(() =>
      formatHomePhone("021234567890", { includeLocalCode: true }),
    ).toThrow(
      new Error(
        "유선전화번호 오류: 02(서울)는 지역번호 포함 시 총 9자리여야 하는데 깁니다.",
      ),
    );
  });
  it("지역번호가 서울이고 번호가 너무 짧을 경우", () => {
    expect(() =>
      formatHomePhone("02123456", { includeLocalCode: true }),
    ).toThrow(
      new Error(
        "유선전화번호 오류: 02(서울)는 지역번호 포함 시 총 9자리여야 하는데 짧습니다.",
      ),
    );
  });
  it("지역번호가 서울이 아니고 번호가 너무 길 경우", () => {
    expect(() =>
      formatHomePhone("0531234567890", { includeLocalCode: true }),
    ).toThrow(
      new Error(
        "유선전화번호 오류: 지역번호를 포함하면 총 10자리여야 하는데 깁니다.",
      ),
    );
  });
  it("지역번호가 서울이 아니고 번호가 너무 짧을 경우", () => {
    expect(() =>
      formatHomePhone("053123456", { includeLocalCode: true }),
    ).toThrow(
      new Error(
        "유선전화번호 오류: 지역번호를 포함하면 총 10자리여야 하는데 짧습니다.",
      ),
    );
  });

  it("지역번호가 있고, 중간에 문자열이 있을 경우", () => {
    expect(() =>
      formatHomePhone("02123asddd1234", { includeLocalCode: true }),
    ).toThrow(new Error("유선전화번호 오류: 숫자만 입력할 수 있습니다."));
  });

  it("지역번호가 없고, 중간에 문자열이 있을 경우", () => {
    expect(() =>
      formatHomePhone("123asddd1234", { includeLocalCode: false }),
    ).toThrow(new Error("유선전화번호 오류: 숫자만 입력할 수 있습니다."));
  });
});
