export const nameMarking = (
  name: string,
  { onlyFamilyName }: { onlyFamilyName: boolean } = { onlyFamilyName: false },
) => {
  if (name.length === 0) {
    throw new Error("이름 오류: 이름을 입력해 주세요.");
  }
  const koreanNameRegex = /^[가-힣]+$/;
  if (!koreanNameRegex.test(name)) {
    throw new Error(
      "이름 오류: 숫자, 특수문자, 영문은 사용할 수 없습니다.",
    );
  }
  if (name.length === 1) {
    return onlyFamilyName ? name : "*";
  }
  if (onlyFamilyName || name.length === 2) {
    const familyName = name[0];
    const leng = name.length - 1;
    let rename = familyName;
    for (let i = 0; i < leng; i++) {
      rename += "*";
    }
    return rename;
  } else {
    const first = name[0];
    const last = name[name.length - 1];

    const leng = name.length - 2;
    let rename = first;
    for (let i = 0; i < leng; i++) {
      rename += "*";
    }
    rename += last;
    return rename;
  }
};
