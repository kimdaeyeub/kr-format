"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  formatHomePhone: () => formatHomePhone,
  formatMoney: () => formatMoney,
  formatPhone: () => formatPhone,
  mask: () => mask,
  nameMarking: () => nameMarking,
  residentNumber: () => residentNumber
});
module.exports = __toCommonJS(index_exports);

// src/phone.ts
var formatPhone = (phoneNumber, options = { international: false }) => {
  if (!/^\d+$/.test(phoneNumber)) {
    throw new Error("\uD734\uB300\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC22B\uC790\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  }
  if (phoneNumber.length < 11) {
    throw new Error("\uD734\uB300\uC804\uD654\uBC88\uD638 \uC624\uB958: 11\uC790\uB9AC\uBCF4\uB2E4 \uC9E7\uC2B5\uB2C8\uB2E4.");
  } else if (phoneNumber.length > 11) {
    throw new Error("\uD734\uB300\uC804\uD654\uBC88\uD638 \uC624\uB958: 11\uC790\uB9AC\uBCF4\uB2E4 \uAE41\uB2C8\uB2E4.");
  }
  if (!/^01[016789]\d{8}$/.test(phoneNumber)) {
    throw new Error(
      "\uD734\uB300\uC804\uD654\uBC88\uD638 \uC624\uB958: \uD734\uB300\uC804\uD654 \uC55E\uC790\uB9AC(010, 011, 016, 017, 018, 019)\uB9CC \uD5C8\uC6A9\uD569\uB2C8\uB2E4."
    );
  }
  if (options.international) {
    return `+82 ${phoneNumber.slice(1, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  }
  const formatted = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  return formatted;
};
var localCode = [
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
  "064"
];
var formatHomePhone = (homePhoneNumber, options = { includeLocalCode: false }) => {
  if (!/^\d+$/.test(homePhoneNumber)) {
    throw new Error("\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC22B\uC790\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  }
  if (!options.includeLocalCode && homePhoneNumber.length < 7) {
    throw new Error(
      "\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC9C0\uC5ED\uBC88\uD638 \uC5C6\uC774 \uC785\uB825\uD560 \uB54C\uB294 7\uC790\uB9AC\uC5EC\uC57C \uD558\uB294\uB370 \uC9E7\uC2B5\uB2C8\uB2E4."
    );
  }
  if (!options.includeLocalCode && homePhoneNumber.length > 7) {
    throw new Error(
      "\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC9C0\uC5ED\uBC88\uD638 \uC5C6\uC774 \uC785\uB825\uD560 \uB54C\uB294 7\uC790\uB9AC\uC5EC\uC57C \uD558\uB294\uB370 \uAE41\uB2C8\uB2E4."
    );
  }
  if (!options.includeLocalCode) {
    const formatted = homePhoneNumber.replace(/(\d{3})(\d{4})/, "$1-$2");
    return formatted;
  }
  if (!homePhoneNumber.startsWith("02") && !localCode.includes(homePhoneNumber.slice(0, 3))) {
    throw new Error("\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC54C \uC218 \uC5C6\uB294 \uC9C0\uC5ED\uBC88\uD638\uC785\uB2C8\uB2E4.");
  } else {
    if (homePhoneNumber.startsWith("02")) {
      if (homePhoneNumber.length > 9) {
        throw new Error(
          "\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: 02(\uC11C\uC6B8)\uB294 \uC9C0\uC5ED\uBC88\uD638 \uD3EC\uD568 \uC2DC \uCD1D 9\uC790\uB9AC\uC5EC\uC57C \uD558\uB294\uB370 \uAE41\uB2C8\uB2E4."
        );
      }
      if (homePhoneNumber.length < 9) {
        throw new Error(
          "\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: 02(\uC11C\uC6B8)\uB294 \uC9C0\uC5ED\uBC88\uD638 \uD3EC\uD568 \uC2DC \uCD1D 9\uC790\uB9AC\uC5EC\uC57C \uD558\uB294\uB370 \uC9E7\uC2B5\uB2C8\uB2E4."
        );
      }
      const formatted2 = homePhoneNumber.replace(
        /(\d{2})(\d{3})(\d{4})/,
        "$1-$2-$3"
      );
      return formatted2;
    }
    if (localCode.includes(homePhoneNumber.slice(0, 3))) {
      if (homePhoneNumber.length > 10) {
        throw new Error(
          "\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC9C0\uC5ED\uBC88\uD638\uB97C \uD3EC\uD568\uD558\uBA74 \uCD1D 10\uC790\uB9AC\uC5EC\uC57C \uD558\uB294\uB370 \uAE41\uB2C8\uB2E4."
        );
      }
      if (homePhoneNumber.length < 10) {
        throw new Error(
          "\uC720\uC120\uC804\uD654\uBC88\uD638 \uC624\uB958: \uC9C0\uC5ED\uBC88\uD638\uB97C \uD3EC\uD568\uD558\uBA74 \uCD1D 10\uC790\uB9AC\uC5EC\uC57C \uD558\uB294\uB370 \uC9E7\uC2B5\uB2C8\uB2E4."
        );
      }
    }
    const formatted = homePhoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
    return formatted;
  }
};

// src/name.ts
var nameMarking = (name, { onlyFamilyName } = { onlyFamilyName: false }) => {
  if (name.length === 0) {
    throw new Error("\uC774\uB984 \uC624\uB958: \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
  }
  const koreanNameRegex = /^[가-힣]+$/;
  if (!koreanNameRegex.test(name)) {
    throw new Error(
      "\uC774\uB984 \uC624\uB958: \uC22B\uC790, \uD2B9\uC218\uBB38\uC790, \uC601\uBB38\uC740 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
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

// src/money.ts
var formatMoney = (money, options) => {
  if (!Number.isFinite(money)) {
    throw new Error("\uAE08\uC561 \uC624\uB958: \uC720\uD55C\uD55C \uC22B\uC790\uB9CC \uD5C8\uC6A9\uD569\uB2C8\uB2E4.");
  }
  if (!Number.isInteger(money)) {
    throw new Error("\uAE08\uC561 \uC624\uB958: \uC815\uC218\uB9CC \uD5C8\uC6A9\uD569\uB2C8\uB2E4.");
  }
  if (money < 0) {
    throw new Error("\uAE08\uC561 \uC624\uB958: 0 \uC774\uC0C1\uC758 \uC22B\uC790\uB9CC \uD5C8\uC6A9\uD569\uB2C8\uB2E4.");
  }
  if (options.format === "half-format") {
    return `${money.toLocaleString("ko-KR")}\uC6D0`;
  }
  if (money >= 1e8 && money % 1e8 === 0) {
    return `${money / 1e8}\uC5B5\uC6D0`;
  }
  if (money >= 1e4 && money % 1e4 === 0) {
    const manCount = money / 1e4;
    if (manCount % 1e3 === 0) {
      const n = manCount / 1e3;
      return `${n > 1 ? n : ""}\uCC9C\uB9CC\uC6D0`;
    }
    if (manCount % 100 === 0) {
      const n = manCount / 100;
      return `${n > 1 ? n : ""}\uBC31\uB9CC\uC6D0`;
    }
    if (manCount % 10 === 0 && manCount <= 90) {
      const n = manCount / 10;
      return `${n > 1 ? n : ""}\uC2ED\uB9CC\uC6D0`;
    }
    return `${manCount}\uB9CC\uC6D0`;
  }
  return `${money.toLocaleString("ko-KR")}\uC6D0`;
};

// src/resident-number.ts
var format = (number) => {
  const leng = number.split("-").length;
  if (leng !== 1) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uD558\uC774\uD508 \uC5C6\uC774 \uC22B\uC790\uB9CC \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
  }
  if (number.length !== 13) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uC22B\uC790 13\uC790\uB9AC\uC5EC\uC57C \uD569\uB2C8\uB2E4.");
  }
  if (!/^\d+$/.test(number)) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uC22B\uC790\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  }
  const formatted = number.replace(/(\d{6})(\d{7})/, "$1-$2");
  return formatted;
};
var unformat = (number) => {
  const leng = number.split("-").length;
  if (leng !== 2) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: 6\uC790\uB9AC-7\uC790\uB9AC \uD615\uC2DD\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
  }
  const [first, second] = number.split("-");
  if (first.length !== 6) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uC55E\uBD80\uBD84\uC740 \uC22B\uC790 6\uC790\uB9AC\uC5EC\uC57C \uD569\uB2C8\uB2E4.");
  }
  if (!/^\d+$/.test(first)) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uC55E\uBD80\uBD84\uC740 \uC22B\uC790\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  }
  if (second.length !== 7) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uB4B7\uBD80\uBD84\uC740 \uC22B\uC790 7\uC790\uB9AC\uC5EC\uC57C \uD569\uB2C8\uB2E4.");
  }
  if (!/^\d+$/.test(second)) {
    throw new Error("\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uB4B7\uBD80\uBD84\uC740 \uC22B\uC790\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  }
  return first + second;
};
var residentNumber = {
  format: (number) => format(number),
  unformat: (number) => unformat(number)
};
var mask = (number, { type }) => {
  const withHyphen = /^\d{6}-\d{7}$/;
  const withoutHyphen = /^\d{13}$/;
  if (type === "formatted" && !withHyphen.test(number)) {
    throw new Error(
      "\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uB9C8\uC2A4\uD0B9\uC740 000000-0000000 \uD615\uC2DD\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."
    );
  } else if (type === "unformatted" && !withoutHyphen.test(number)) {
    throw new Error(
      "\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 \uC624\uB958: \uB9C8\uC2A4\uD0B9\uC740 \uD558\uC774\uD508 \uC5C6\uB294 \uC22B\uC790 13\uC790\uB9AC\uC5EC\uC57C \uD569\uB2C8\uB2E4."
    );
  } else {
    const lasted = number.slice(0, -6);
    return `${lasted}******`;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatHomePhone,
  formatMoney,
  formatPhone,
  mask,
  nameMarking,
  residentNumber
});
//# sourceMappingURL=index.js.map