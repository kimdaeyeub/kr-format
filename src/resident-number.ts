// 9901011234567 => 990101-1234567
const format = (number: string) => {
  const leng = number.split("-").length;

  if (leng !== 1) {
    throw new Error("주민등록번호 오류: 하이픈 없이 숫자만 입력해 주세요.");
  }
  if (number.length !== 13) {
    throw new Error("주민등록번호 오류: 숫자 13자리여야 합니다.");
  }
  if (!/^\d+$/.test(number)) {
    throw new Error("주민등록번호 오류: 숫자만 입력할 수 있습니다.");
  }
  const formatted = number.replace(/(\d{6})(\d{7})/, "$1-$2");
  return formatted;
};

// 990101-1234567 => 9901011234567
const unformat = (number: string) => {
  const leng = number.split("-").length;

  if (leng !== 2) {
    throw new Error("주민등록번호 오류: 6자리-7자리 형식이어야 합니다.");
  }

  const [first, second] = number.split("-");

  if (first.length !== 6) {
    throw new Error("주민등록번호 오류: 앞부분은 숫자 6자리여야 합니다.");
  }
  if (!/^\d+$/.test(first)) {
    throw new Error("주민등록번호 오류: 앞부분은 숫자만 입력할 수 있습니다.");
  }
  if (second.length !== 7) {
    throw new Error("주민등록번호 오류: 뒷부분은 숫자 7자리여야 합니다.");
  }
  if (!/^\d+$/.test(second)) {
    throw new Error("주민등록번호 오류: 뒷부분은 숫자만 입력할 수 있습니다.");
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
    throw new Error(
      "주민등록번호 오류: 마스킹은 000000-0000000 형식이어야 합니다.",
    );
  } else if (type === "unformatted" && !withoutHyphen.test(number)) {
    throw new Error(
      "주민등록번호 오류: 마스킹은 하이픈 없는 숫자 13자리여야 합니다.",
    );
  } else {
    const lasted = number.slice(0, -6);
    return `${lasted}******`;
  }
};
