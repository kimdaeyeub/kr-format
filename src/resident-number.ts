// // 주민번호 앞자리:6, 뒷자리:7

// export const formatResidentNumber = (
//   residentNumber: string,
//   { work, mask }: { work?: "format" | "unformat"; mask: boolean } = {
//     mask: false,
//   },
// ) => {
//   if (mask) {
//     const temp = residentNumber.split("-").join("");
//     // 값에 문자열이 들어 있는 경우
//     if (!/^\d+$/.test(temp)) {
//       throw new Error("주민번호 오류: 숫자,'-'만 입력할 수 있습니다.");
//     }
//     // 숫자의 길이가 안맞는 경우
//     if (temp.length !== 13) {
//       throw new Error("주민번호 오류: 주민번호 길이가 안맞습니다.");
//     }
//     if (work === "format") {
//       //9901011234567 => 990101-1******
//       const formatted = `${temp.slice(0, 6)}-${temp.slice(6, 7)}******`;

//       return formatted;
//     } else {
//       const lasted = residentNumber.slice(0, -6);
//       return `${lasted}******`;
//     }
//   } else {
//   }
// };

// 9901011234567 => 9901010-1234567
const format = (number: string) => {
  const leng = number.split("-").length;

  if (leng !== 1) {
    throw new Error("❌Error: 올바른 형식이 아닙니다.");
  }
  if (number.length !== 13) {
    throw new Error("❌Error: 주민번호의 길이가 잘못되었습니다.");
  }
  if (!/^\d+$/.test(number)) {
    throw new Error("❌Error: 문자열이 포함되어 있습니다.");
  }
  const formatted = number.replace(/(\d{6})(\d{7})/, "$1-$2");
  return formatted;
};

// 990101-1234567 => 9901011234567
const unformat = (number: string) => {
  const leng = number.split("-").length;

  if (leng !== 2) {
    throw new Error("❌Error: 올바른 형식이 아닙니다.");
  }

  const [first, second] = number.split("-");

  if (first.length !== 6) {
    throw new Error("❌Error: 길이가 잘못되었습니다.");
  }
  if (!/^\d+$/.test(first)) {
    throw new Error("❌Error: 문자가 포함되었습니다.");
  }
  if (second.length !== 7) {
    throw new Error("❌Error: 길이가 잘못되었습니다.");
  }
  if (!/^\d+$/.test(second)) {
    throw new Error("❌Error: 문자가 포함되었습니다.");
  }

  return first + second;
};

export const residentNumber = {
  format: (number: string) => format(number),
  unformat: (number: string) => unformat(number),
};

export const mask = (
  number: string,
  { type }: { type: "formatted" | "unformatted" },
) => {
  const withHyphen = /^\d{6}-\d{7}$/; // 990101-1234567
  const withoutHyphen = /^\d{13}$/; // 9901011234567

  if (type === "formatted" && !withHyphen.test(number)) {
    throw new Error("❌Error: 올바른 형식이 아닙니다.");
  } else if (type === "unformatted" && !withoutHyphen.test(number)) {
    throw new Error("❌Error: 올바른 형식이 아닙니다.");
  } else {
    const lasted = number.slice(0, -6);
    return `${lasted}******`;
  }
};
