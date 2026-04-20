import { describe, it, expect } from "vitest";
// import { formatResidentNumber } from "../src/resident-number";

// describe("residentNumber", () => {
//   it("주민번호 마스킹 000101-1234567 => 000101-1******", () => {
//     expect(
//       formatResidentNumber("900101-1234567", { mask: true, work: "format" }),
//     ).toBe("900101-1******");
//   });
//   it("주민번호 마스킹 000101-1234567 => 000101-1******", () => {
//     expect(formatResidentNumber("900101-1234567", { mask: true })).toBe(
//       "900101-1******",
//     );
//   });
//   it("주민번호 포멧 000101-1234567 => 0001011234567", () => {
//     expect(
//       formatResidentNumber("9001011234567", { work: "format", mask: false }),
//     ).toBe("900101-1234567");
//   });
//   it("주민번호 포멧 0001011234567 => 000101-1234567", () => {
//     expect(
//       formatResidentNumber("900101-1234567", { work: "unformat", mask: false }),
//     ).toBe("9001011234567");
//   });
//   it("주민번호 포멧, 마스킹 0001011234567 => 000101-1******", () => {
//     expect(
//       formatResidentNumber("9001011234567", { work: "format", mask: true }),
//     ).toBe("900101-1******");
//   });
//   it("숫자가 아닌경우 'aasdasdasdasd'", () => {
//     expect(() =>
//       formatResidentNumber("aasdasdasdasd", { work: "format", mask: true }),
//     ).toThrow(new Error("주민번호 오류: 숫자,'-'만 입력할 수 있습니다."));
//   });
//   it("숫자가 아닌경우 'aasdasdasdasd'", () => {
//     expect(() =>
//       formatResidentNumber("aasdasdasdasd", { work: "format", mask: false }),
//     ).toThrow(new Error("주민번호 오류: 숫자,'-'만 입력할 수 있습니다."));
//   });
//   it("숫자가 아닌경우 'asdaasda-aasdadda'", () => {
//     expect(() =>
//       formatResidentNumber("asdaas-aasdadd", { work: "unformat", mask: true }),
//     ).toThrow(new Error("주민번호 오류: 숫자,'-'만 입력할 수 있습니다."));
//   });
//   it("숫자가 아닌경우 'asdaasda-aasdadda'", () => {
//     expect(() =>
//       formatResidentNumber("asdaas-aasdadd", { work: "unformat", mask: false }),
//     ).toThrow(new Error("주민번호 오류: 숫자,'-'만 입력할 수 있습니다."));
//   });
//   it("숫자의 길이가 안맞는 경우 910213", () => {
//     expect(() =>
//       formatResidentNumber("91021312", { work: "format", mask: false }),
//     ).toThrow(new Error("주민번호 오류: 주민번호 길이가 안맞습니다."));
//   });
//   it("숫자의 길이가 안맞는 경우 910213", () => {
//     expect(() =>
//       formatResidentNumber("91021312", { work: "format", mask: true }),
//     ).toThrow(new Error("주민번호 오류: 주민번호 길이가 안맞습니다."));
//   });
//   it("숫자의 길이가 안맞는 경우 000101-1234", () => {
//     expect(() =>
//       formatResidentNumber("000101-1234", { work: "unformat", mask: true }),
//     ).toThrow(new Error("주민번호 오류: 주민번호 길이가 안맞습니다."));
//   });
//   it("숫자의 길이가 안맞는 경우 000101-1234", () => {
//     expect(() =>
//       formatResidentNumber("000101-1234", { work: "unformat", mask: false }),
//     ).toThrow(new Error("주민번호 오류: 주민번호 길이가 안맞습니다."));
//   });
//   it("숫자의 길이가 안맞는 경우 000101-1234567890", () => {
//     expect(() =>
//       formatResidentNumber("000101-1234567890", {
//         work: "unformat",
//         mask: true,
//       }),
//     ).toThrow(new Error("주민번호 오류: 주민번호 길이가 안맞습니다."));
//   });
//   it("숫자의 길이가 안맞는 경우 000101-1234567890", () => {
//     expect(() =>
//       formatResidentNumber("000101-1234567890", {
//         work: "unformat",
//         mask: false,
//       }),
//     ).toThrow(new Error("주민번호 오류: 주민번호 길이가 안맞습니다."));
//   });
// });
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
