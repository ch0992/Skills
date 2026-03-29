---
name: antigravity-workflow
description: >
  Scanio 프로젝트에서 Claude Code(계획)와 Antigravity(실행)의 협업 워크플로우.
  사용자가 "antigravity", "anti", "작업지시", "anti에게 줘", "anti가 완료",
  "anti 완료했어", "current.md 써줘", "작업지시서" 등을 언급할 때 반드시 이 스킬을 사용한다.
  Claude는 직접 코드를 작성하지 않고 tasks/current.md에 작업지시서를 작성하며,
  Antigravity가 실행 후 보고하면 Claude가 결과를 검토하고 GitHub 이슈를 업데이트한다.
  이 워크플로우를 벗어나서 코드를 직접 수정하려 해서는 안 된다.
---

# Antigravity 협업 워크플로우

Scanio 프로젝트는 1인 개발자 + AI 에이전트 2명 구조로 운영된다.

- **Claude Code (나)**: 계획, 설계, 작업지시서 작성, 이슈 관리, 코드 리뷰
- **Antigravity**: Flutter 코드 실제 구현 및 수정
- **사용자**: 방향 결정, Antigravity에게 작업 전달, 결과 보고

---

## 전체 워크플로우

```
1. 논의/설계    — 사용자 ↔ Claude: 무엇을 만들지 결정
2. 작업지시서   — Claude: tasks/current.md 작성
3. 실행         — 사용자 → Antigravity: current.md 전달
4. 완료 보고    — 사용자 → Claude: "anti가 완료했어"
5. 검토/업데이트 — Claude: 결과 확인 + GitHub 이슈 업데이트
```

---

## Step 2: tasks/current.md 작성 규칙

작업지시서는 항상 아래 형식을 따른다.

```markdown
# 현재 작업: [작업 제목] — [번호 예: bugfix10 / feature-xxx]

**담당:** Antigravity
**리뷰:** Claude
**GitHub Issue:** #XX (Sub #YY | type)

---

## 수정 파일
- `lib/features/...`

---

## 배경

[왜 이 작업이 필요한지 간결하게]

아래 수정 외 모든 기존 코드는 그대로 유지할 것.

---

## Fix 1. [수정 제목]

**문제**: ...
**해결**: ...

```dart
// 코드 예시 (필요 시)
```

## Fix 2. [수정 제목]
...

---

## 완료 조건

- [ ] flutter analyze error 0
- [ ] [구체적 동작 조건]
```

**주의사항:**
- 각 Fix는 독립적으로 설명 — Antigravity가 컨텍스트 없이 이해할 수 있어야 함
- 코드 예시는 핵심 부분만, 전체 파일 재작성 지시 금지
- "기존 코드는 그대로 유지" 문구 항상 포함

---

## Step 4: 완료 보고 수신 시

사용자가 "anti가 완료했어" / "작업 완료했대" 등을 말하면:

1. **결과 확인 요청** — 스크린샷 또는 로그가 없으면 요청
2. **코드 리뷰** — 수정된 파일의 주요 변경사항 확인 (필요 시)
3. **이슈 업데이트 제안** — 관련 GitHub 이슈에 완료 코멘트 추가 여부 확인
4. **다음 작업 논의** — 남은 이슈 또는 후속 작업 제안

---

## Step 5: GitHub 이슈 업데이트 규칙

- 완료된 작업은 관련 이슈에 코멘트 추가 (완료 내용 요약)
- Sub 이슈 완료 시 → 부모 이슈 진행 현황도 업데이트
- 이슈 클로즈 조건이 충족되면 클로즈 제안

---

## 프로젝트 참고

- **GitHub**: owner=`NSoft-America-Inc`, repo=`scanio`
- **작업지시서 위치**: `tasks/current.md`
- **리포트 위치**: `tasks/reports/YYYYMMDD-[주제].md`
- **이슈 명명 규칙**: `[Sub #부모번호 | type] 제목`
