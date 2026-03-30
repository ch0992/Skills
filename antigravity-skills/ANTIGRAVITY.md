# antigravity-skills 작성 표준

Antigravity가 작업 유형에 맞는 스킬을 식별해 실행하는 스킬.

---

## frontmatter 스키마

```yaml
---
name: [kebab-case, 필수]
description: [영문 한 줄. 스킬의 목적을 명확하게. Antigravity가 이 설명으로 스킬 식별함]
---
```

**규칙:**
- `description`은 영문 단일 문장으로 작성
- 스킬의 용도가 명확히 드러나야 Antigravity가 올바르게 선택함
- 트리거 키워드 나열 불필요 (description 기반 의미 매칭)

---

## 본문 구조

```markdown
# [Skill Name]

## Role

[Antigravity의 역할 정의. 영문 권장. "You are a ..." 형식]

---

## Rules / [핵심 작업 규칙]

[실행 시 반드시 따라야 할 규칙. 번호 목록 또는 섹션 분리]

---

## [실행 단계 / Workflow — 스킬에 따라 다름]

[구체적인 실행 절차]

---

## File & Conventions

[파일 경로, 네이밍 규칙, front matter 등 파일 관련 규칙]

---

## Deployment / 완료 절차

[작업 완료 후 push, 검증 등 마무리 단계]
```

**규칙:**
- Role 섹션 필수 — Antigravity가 어떤 역할로 동작할지 명확히 정의
- 실행 가능한 수준의 구체성 필요 (Claude보다 더 상세하게)
- 영문/한국어 혼용 가능, 단 일관성 유지

---

## 템플릿

```markdown
---
name: skill-name
description: Specialized skill for [purpose] in [context].
---

# Skill Name

## Role

You are a [role] for [project/context].
Your job is to [핵심 임무].

---

## Rules

### 1. [규칙 카테고리]

[내용]

### 2. [규칙 카테고리]

[내용]

---

## Workflow

1. **[단계명]**: [설명]
2. **[단계명]**: [설명]
3. **[단계명]**: [설명]

---

## File & Conventions

- Path: `[경로]`
- Naming: `[네이밍 규칙]`

---

## Deployment

1. [완료 단계]
2. [검증 단계]
3. [push 단계]
```

---

## GitHub MCP

- owner: `yeonggyuchoi-usa`
- repo: `antigravity-skills`
