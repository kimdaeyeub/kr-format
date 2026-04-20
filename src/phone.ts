export const formatPhone = (
  phoneNumber: string,
  options: { international: boolean } = { international: false },
) => {
  if (!/^\d+$/.test(phoneNumber)) {
    throw new Error("휴대전화번호 오류: 숫자만 입력할 수 있습니다.");
  }
  // 휴대전화 형식 검증
  if (phoneNumber.length < 11) {
    throw new Error("휴대전화번호 오류: 11자리보다 짧습니다.");
  } else if (phoneNumber.length > 11) {
    throw new Error("휴대전화번호 오류: 11자리보다 깁니다.");
  }

  if (options.international) {
    return `+82 ${phoneNumber.slice(1, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  }

  // 에러가 없을 경우
  const formatted = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  return formatted;
};

const localCode = [
  "02",
  "031",
  "032",
  "033",
  "041",
  "042",
  "043",
  "044",
  "051",
  "052",
  "053",
  "054",
  "055",
  "061",
  "062",
  "063",
  "064",
];

export const formatHomePhone = (
  homePhoneNumber: string,
  options: { includeLocalCode: boolean } = { includeLocalCode: false },
) => {
  if (!/^\d+$/.test(homePhoneNumber)) {
    throw new Error("유선전화번호 오류: 숫자만 입력할 수 있습니다.");
  }
  // 지역번호 없을 경우
  if (!options.includeLocalCode && homePhoneNumber.length < 7) {
    throw new Error(
      "유선전화번호 오류: 지역번호 없이 입력할 때는 7자리여야 하는데 짧습니다.",
    );
  }
  if (!options.includeLocalCode && homePhoneNumber.length > 7) {
    throw new Error(
      "유선전화번호 오류: 지역번호 없이 입력할 때는 7자리여야 하는데 깁니다.",
    );
  }

  if (!options.includeLocalCode) {
    const formatted = homePhoneNumber.replace(/(\d{3})(\d{4})/, "$1-$2");
    return formatted;
  }

  // 지역번호가 틀렸을 경우
  if (
    !homePhoneNumber.startsWith("02") &&
    !localCode.includes(homePhoneNumber.slice(0, 3))
  ) {
    throw new Error("유선전화번호 오류: 알 수 없는 지역번호입니다.");
  } else {
    if (homePhoneNumber.startsWith("02")) {
      if (homePhoneNumber.length > 9) {
        throw new Error(
          "유선전화번호 오류: 02(서울)는 지역번호 포함 시 총 9자리여야 하는데 깁니다.",
        );
      }
      if (homePhoneNumber.length < 9) {
        throw new Error(
          "유선전화번호 오류: 02(서울)는 지역번호 포함 시 총 9자리여야 하는데 짧습니다.",
        );
      }
      const formatted = homePhoneNumber.replace(
        /(\d{2})(\d{3})(\d{4})/,
        "$1-$2-$3",
      );
      return formatted;
    }
    if (localCode.includes(homePhoneNumber.slice(0, 3))) {
      if (homePhoneNumber.length > 10) {
        throw new Error(
          "유선전화번호 오류: 지역번호를 포함하면 총 10자리여야 하는데 깁니다.",
        );
      }
      if (homePhoneNumber.length < 10) {
        throw new Error(
          "유선전화번호 오류: 지역번호를 포함하면 총 10자리여야 하는데 짧습니다.",
        );
      }
    }
    const formatted = homePhoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3",
    );
    return formatted;
  }
};
