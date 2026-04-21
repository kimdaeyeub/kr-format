# kr-format

![Test](https://github.com/kimdaeyeub/kr-format/actions/workflows/test.yml/badge.svg)

한국에서 자주 쓰는 **표시용 포맷·마스킹** 유틸리티 모음입니다.

## 설치

```bash
npm install kr-format
```

## 사용 예시

```ts
import {
  formatPhone,
  formatHomePhone,
  formatMoney,
  nameMarking,
  residentNumber,
  mask,
} from "kr-format";

// 휴대전화 (11자리, 010·011·016~019만 허용)
formatPhone("01012345678"); // "010-1234-5678"
formatPhone("01012341234", { international: true }); // "+82 10-1234-1234"

// 유선전화
formatHomePhone("1231234", { includeLocalCode: false }); // "123-1234"
formatHomePhone("021231234", { includeLocalCode: true }); // "02-123-1234"

// 금액 (정수만)
formatMoney(1500000, { format: "full-format" }); // "150만원"
formatMoney(1500000, { format: "half-format" }); // "1,500,000원"

// 이름 마스킹 (한글만)
nameMarking("김대엽"); // "김*엽"
nameMarking("김대엽", { onlyFamilyName: true }); // "김**"

// 주민등록번호: 하이픈 넣기/빼기 (형식만 검사)
residentNumber.format("9901011234567"); // "990101-1234567"
residentNumber.unformat("990101-1234567"); // "9901011234567"

mask("990101-1234567", { type: "formatted" }); // "990101-1******"
mask("9901011234567", { type: "unformatted" }); // "9901011******"
```

## API 요약

| 심볼              | 설명                                                  |
| ----------------- | ----------------------------------------------------- |
| `formatPhone`     | 휴대전화 11자리 → `0XX-XXXX-XXXX` 또는 `+82 …`        |
| `formatHomePhone` | 유선 7자리(지역번호 제외) 또는 지역번호 포함 9~10자리 |
| `formatMoney`     | `half-format`(콤마+원) / `full-format`(만·억 등 혼합) |
| `nameMarking`     | 한글 이름 마스킹, `onlyFamilyName` 옵션               |
| `residentNumber`  | 13자리 숫자 ↔ `6자리-7자리` 문자열 변환               |
| `mask`            | 주민번호 형식 문자열의 뒷자리 일부 마스킹             |

오류 시 모든 함수는 `throw new Error("…")`를 사용하며, 메시지는 `휴대전화번호 오류:`, `유선전화번호 오류:`, `이름 오류:`, `주민등록번호 오류:`, `금액 오류:`처럼 **도메인 접두어**로 시작합니다.

## 주민등록번호 취급 시 유의사항

- 이 라이브러리는 **자릿수·숫자·하이픈 위치** 같은 **표면 형식**만 다룹니다. **실제 존재 여부, 생년월일 유효성, 체크섬** 등은 검증하지 않습니다.
- 주민등록번호는 **개인정보**입니다. 수집·저장·전송 시 **개인정보보호법** 등 관련 법령과 내부 정책을 반드시 지키고, UI에는 가능하면 `mask` 등으로 노출을 최소화하세요.
- 본 패키지는 법적·보안 감사를 대체하지 않습니다.

## 빌드 및 테스트

```bash
npm run build
npm run test:run
```
