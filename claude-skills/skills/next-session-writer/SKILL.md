---
name: next-session-writer
description: >
  LinkNest 프로젝트 다음 세션 인계 파일 작성 스킬.
  사용자가 "다음 세션", "next session", "세션 인계", "인계 파일 써줘", "next-session 써줘" 등을 언급할 때 반드시 이 스킬을 사용한다.
  오늘 세션에서 완료한 작업과 다음 세션에서 할 작업을 정리해 tasks/next-session/next-session.md 파일로 작성한다.
---

# Next Session Writer

LinkNest 프로젝트 세션 간 컨텍스트를 이어주는 인계 파일을 작성하는 스킬.
다음 세션의 Claude가 이 파일 하나만 읽어도 즉시 작업을 이어받을 수 있도록 작성한다.

---

## 워크플로우

1. **현재 상태 수집** (병렬 실행):
   - `git log --oneline -10` — 오늘 커밋 확인
   - `tasks/current.md` — 현재 작업지시서 상태 확인 (있는 경우)
   - GitHub 이슈 목록 (`list_issues`, state=open) — 진행 중인 이슈 확인

2. **다음 작업 결정**:
   - 현재 이슈 로드맵에서 완료된 이슈 이후 단계 파악
   - 완료 조건이 충족된 작업이 있으면 다음 이슈로 넘어감
   - 미완료 작업이 있으면 해당 작업 이어서 진행

3. **파일 작성**: `tasks/next-session/next-session.md` 에 아래 형식으로 작성

---

## 파일 형식

```markdown
# 다음 세션 시작 프롬프트

아래 내용을 새 세션 첫 메시지로 붙여넣기.

---

## 프롬프트

LinkNest 프로젝트 작업을 이어서 진행한다.

### 프로젝트 개요

- **GitHub**: `ch0992/LinkNest`
- **Supabase** 백엔드 (project ref: `yxkbllbhgjnxopbkcvxi`, us-west-2)
- **기술 스택**: [이번 세션 기준으로 업데이트]

### 오늘 할 작업: #[이슈번호] [이슈 제목]

**목적**: [왜 이 작업이 필요한지]

**[구체적인 작업 내용 — 파일, 구현 방법 등]**

**완료 조건**:
- [ ] ...

### 전체 이슈 로드맵

```
#XX 완료된 이슈 ✅
  ↓
#YY 다음 작업 ← 다음 세션 (최우선)
  ↓
#ZZ 후속 작업
  ...
```

### 확인 필요 사항 (세션 시작 시)

[세션 시작 전 확인해야 할 사항. 없으면 생략.]

### 주요 파일 경로

[다음 세션에서 실제로 작업할 파일들만]

### 작업 방식

- Claude는 설계/리뷰/이슈관리 담당
- 코드 구현은 `tasks/current.md`에 작업지시서 작성 → Antigravity가 실행
- 작업지시서 작성 시 `antigravity-workflow` 스킬 사용
```

---

## 작성 규칙

- **프롬프트 섹션**: 새 세션에서 그대로 붙여넣기 하면 Claude가 즉시 작업 가능한 수준으로 작성
- **오늘 할 작업**: 다음 세션의 핵심 작업 1개만 명시. 구체적일수록 좋음
- **이슈 로드맵**: 완료된 이슈는 ✅ 표시, 다음 세션 작업은 "← 다음 세션 (최우선)" 표시
- **확인 필요 사항**: 환경 문제, 미확인 동작, 의존성 이슈 등 세션 시작 시 확인이 필요한 것만 기재
- **주요 파일 경로**: 다음 세션에서 실제로 작업할 파일들만 포함

---

## 프로젝트 참고

- **GitHub**: owner=`ch0992`, repo=`LinkNest`
- **파일 위치**: `tasks/next-session/next-session.md`
- **이슈 목록**: `list_issues(owner="ch0992", repo="LinkNest", state="open")`
- **현재 날짜**: 항상 context의 currentDate 사용
