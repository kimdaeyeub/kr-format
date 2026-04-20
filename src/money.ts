export const formatMoney = (
  money: number,
  options: { format: "full-format" | "half-format" },
): string => {
  if (!Number.isFinite(money)) throw new Error("유한한 숫자만 허용합니다.");
  if (!Number.isInteger(money)) throw new Error("정수만 허용합니다.");
  if (money < 0) throw new Error("0 이상의 숫자만 허용합니다.");

  if (options.format === "half-format") {
    return `${money.toLocaleString("ko-KR")}원`;
  }

  if (money >= 100000000 && money % 100000000 === 0) {
    return `${money / 100000000}억원`;
  }

  if (money >= 10000 && money % 10000 === 0) {
    const manCount = money / 10000;

    if (manCount % 1000 === 0) {
      const n = manCount / 1000;
      return `${n > 1 ? n : ""}천만원`;
    }
    if (manCount % 100 === 0) {
      const n = manCount / 100;
      return `${n > 1 ? n : ""}백만원`;
    }
    if (manCount % 10 === 0 && manCount <= 90) {
      // ← 10~90 사이만 십만원
      const n = manCount / 10;
      return `${n > 1 ? n : ""}십만원`;
    }

    return `${manCount}만원`;
  }

  return `${money.toLocaleString("ko-KR")}원`;
};
