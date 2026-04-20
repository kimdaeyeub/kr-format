export const nameMarking = (
  name: string,
  { onlyFamilyName }: { onlyFamilyName: boolean } = { onlyFamilyName: false },
) => {
  const koreanNameRegex = /^[가-힣]+$/;
  if (!koreanNameRegex.test(name)) {
    throw new Error(
      "❌Error: 이름에 숫자, 특수기호, 영어를 포함할 수 없습니다.",
    );
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
