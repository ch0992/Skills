---
name: devlog-writer
description: >
  Scanio 프로젝트 devlog 작성 스킬.
  사용자가 "devlog 정리", "devlog 써줘", "일지 정리", "오늘 일지" 등을 언급할 때 사용한다.
  오늘 날짜의 devlog 파일을 docs/6.devlog/YYYY-MM-DD.md 형식으로 작성한다.
---

# Devlog Writer

Scanio 프로젝트의 개발 일지를 작성하는 스킬.

## 파일 위치

```
/Users/yg/workspace/Nsoft/scanio/docs/6.devlog/YYYY-MM-DD.md
```

## 작성 절차

1. **기존 포맷 확인**: 가장 최근 devlog 파일 1개를 읽어 포맷 파악
2. **작업 내역 수집** (병렬 실행):
   - `git log --oneline` — 오늘 머지된 커밋 확인
   - `tasks/reports/` — 오늘 날짜 리포트 파일 목록 확인
   - `gh issue list --state closed` — 오늘 닫힌 이슈 목록 확인
3. **파일 작성**: 아래 형식에 맞게 작성

## devlog 형식

```markdown
# YYYY-MM-DD

## Summary

[오늘 작업 전체를 3~5줄로 요약. 한 작업만 부각하지 말고 모든 주요 작업을 포괄적으로 서술.]

---

## 오늘 결정한 것들

### [주제 1]

[배경 + 문제 + 결정 내용]

[코드 스니펫 (핵심 부분만)]

→ [결론/변경 파일]

---

### [주제 2]
...

---

## 이슈 현황

| 이슈 | 상태 | 비고 |
|---|---|---|
| #XX 이슈 제목 | ✅ closed / 🔄 진행 중 / 📋 예정 | 비고 |

---

## 기술 메모 (선택)

- [특이한 기술적 결정, 함정, 패턴 등]
```

## 작성 규칙

- **Summary**: 자연스러운 경어체 산문(~했습니다 체)으로 3~5줄. 오늘 작업 전체를 고르게 포괄. 과장 표현, 작업량 자랑 금지.
- **섹션 구성**: 독립적인 기술 결정/구현 단위로 나눔. 작은 버그픽스는 관련 섹션에 묶어서 설명.
- **코드 스니펫**: 결정의 근거가 되는 핵심 코드만. 파일 전체 인용 금지.
- **이슈 현황**: 오늘 닫힌 이슈 전부 + 진행 중인 주요 이슈 포함.
- **기술 메모**: 향후 같은 실수를 반복하지 않기 위한 패턴/함정 기록. 선택사항.

## 프로젝트 참고

- **GitHub**: owner=`NSoft-America-Inc`, repo=`scanio`
- **devlog 위치**: `docs/6.devlog/`
- **리포트 위치**: `tasks/reports/`
- **현재 날짜**: 항상 context의 currentDate 사용
