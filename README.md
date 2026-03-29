# Skills

Claude Code와 Antigravity 에이전트에서 사용할 수 있는 범용 스킬 모음입니다.

> GitHub: [ch0992/Skills](https://github.com/ch0992/Skills)

---

## 설치

```bash
# 전체 설치 (Claude + Antigravity 글로벌)
npx github:ch0992/Skills install

# Claude Code 스킬만
npx github:ch0992/Skills claude install

# Antigravity 스킬만
npx github:ch0992/Skills anti install

# 현재 프로젝트에만 설치
npx github:ch0992/Skills claude install --local
npx github:ch0992/Skills anti install --local

# 특정 스킬만
npx github:ch0992/Skills claude install --skill antigravity-workflow
```

## 설치 경로

| 타입 | 글로벌 | 로컬 (`--local`) |
|---|---|---|
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| Antigravity | `~/.agents/skills/` | `.agents/skills/` |

## 스킬 목록 / 제거

```bash
npx github:ch0992/Skills list
npx github:ch0992/Skills claude list
npx github:ch0992/Skills anti list

npx github:ch0992/Skills uninstall
npx github:ch0992/Skills claude uninstall --skill <name>
```

---

## 구조

```
Skills/
├── claude-skills/       Claude Code 전용 스킬
│   └── skills/
│       ├── antigravity-workflow/
│       └── devlog-writer/
└── antigravity-skills/  Antigravity 전용 스킬
    └── skills/
        ├── hugo-blog-writer/
        ├── hugo-documentation/
        ├── hugo-env-setup/
        └── hugo-report-writer/
```

---

## claude-skills

Claude Code에서 동작하는 범용 스킬 모음입니다. `~/.claude/skills/`에 설치됩니다.

| 스킬 | 트리거 | 설명 |
|---|---|---|
| `antigravity-workflow` | "anti", "작업지시", "current.md 써줘" | Claude Code(계획) + Antigravity(실행) 협업 워크플로우 |
| `devlog-writer` | "devlog 써줘", "오늘 일지" | 개발일지 자동 작성 (`docs/6.devlog/YYYY-MM-DD.md`) |

→ [claude-skills/README.md](./claude-skills/README.md)

---

## antigravity-skills

Antigravity 에이전트에서 동작하는 범용 스킬 모음입니다. `~/.agents/skills/`에 설치됩니다.

| 스킬 | 설명 |
|---|---|
| `hugo-blog-writer` | Hugo 기술 블로그 포스트 작성 |
| `hugo-documentation` | Hugo 문서 페이지 생성 및 관리 |
| `hugo-env-setup` | Hugo 개발 환경 자동 구축 |
| `hugo-report-writer` | Hugo 전략 보고서 작성 |

→ [antigravity-skills/README.md](./antigravity-skills/README.md)

---

## 스킬 추가 방법

1. `claude-skills/skills/` 또는 `antigravity-skills/skills/`에 새 디렉토리 추가
2. `SKILL.md` 작성
3. GitHub push
4. `npx github:ch0992/Skills install` 재실행으로 반영
