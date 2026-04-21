import { describe, it, expect } from "vitest";
import { formatMoney } from "../src/money";

describe("formatMoney", () => {
  describe("half-format", () => {
    it("일반 금액 콤마 포맷", () => {
      expect(formatMoney(9000, { format: "half-format" })).toBe("9,000원");
      expect(formatMoney(90000, { format: "half-format" })).toBe("90,000원");
      expect(formatMoney(1000000, { format: "half-format" })).toBe(
        "1,000,000원",
      );
      expect(formatMoney(100000000, { format: "half-format" })).toBe(
        "100,000,000원",
      );
    });

    it("0원", () => {
      expect(formatMoney(0, { format: "half-format" })).toBe("0원");
    });

    it("1원 단위", () => {
      expect(formatMoney(1, { format: "half-format" })).toBe("1원");
      expect(formatMoney(999, { format: "half-format" })).toBe("999원");
    });
  });

  describe("full-format - 단위 정확히 떨어지는 경우", () => {
    it("만원 단위", () => {
      expect(formatMoney(10000, { format: "full-format" })).toBe("1만원");
      expect(formatMoney(50000, { format: "full-format" })).toBe("5만원");
      expect(formatMoney(90000, { format: "full-format" })).toBe("9만원");
    });

    it("십만원 단위", () => {
      expect(formatMoney(100000, { format: "full-format" })).toBe("십만원");
      expect(formatMoney(500000, { format: "full-format" })).toBe("5십만원");
      expect(formatMoney(900000, { format: "full-format" })).toBe("9십만원");
    });

    it("백만원 단위", () => {
      expect(formatMoney(1000000, { format: "full-format" })).toBe("백만원");
      expect(formatMoney(5000000, { format: "full-format" })).toBe("5백만원");
      expect(formatMoney(9000000, { format: "full-format" })).toBe("9백만원");
    });

    it("천만원 단위", () => {
      expect(formatMoney(10000000, { format: "full-format" })).toBe("천만원");
      expect(formatMoney(50000000, { format: "full-format" })).toBe("5천만원");
      expect(formatMoney(90000000, { format: "full-format" })).toBe("9천만원");
    });

    it("억원 단위", () => {
      expect(formatMoney(100000000, { format: "full-format" })).toBe("1억원");
      expect(formatMoney(500000000, { format: "full-format" })).toBe("5억원");
      expect(formatMoney(900000000, { format: "full-format" })).toBe("9억원");
    });
  });

  describe("full-format - 단위 안 떨어지는 경우 (콤마 폴백)", () => {
    it("만원 미만", () => {
      expect(formatMoney(0, { format: "full-format" })).toBe("0원");
      expect(formatMoney(999, { format: "full-format" })).toBe("999원");
      expect(formatMoney(9999, { format: "full-format" })).toBe("9,999원");
    });

    it("중간 단위 혼합", () => {
      expect(formatMoney(15000, { format: "full-format" })).toBe("15,000원");
      expect(formatMoney(150000, { format: "full-format" })).toBe("15만원");
      expect(formatMoney(1500000, { format: "full-format" })).toBe("150만원");
    });
  });

  describe("예외 처리", () => {
    it("음수", () => {
      expect(() => formatMoney(-1000, { format: "half-format" })).toThrow(
        "금액 오류: 0 이상의 숫자만 허용합니다.",
      );
      expect(() => formatMoney(-1000, { format: "full-format" })).toThrow(
        "금액 오류: 0 이상의 숫자만 허용합니다.",
      );
    });

    it("소수점", () => {
      expect(() => formatMoney(9000.5, { format: "half-format" })).toThrow(
        "금액 오류: 정수만 허용합니다.",
      );
      expect(() => formatMoney(9000.5, { format: "full-format" })).toThrow(
        "금액 오류: 정수만 허용합니다.",
      );
    });

    it("NaN", () => {
      expect(() => formatMoney(NaN, { format: "half-format" })).toThrow(
        "금액 오류: 유한한 숫자만 허용합니다.",
      );
    });

    it("Infinity", () => {
      expect(() => formatMoney(Infinity, { format: "half-format" })).toThrow(
        "금액 오류: 유한한 숫자만 허용합니다.",
      );
    });
  });
});
