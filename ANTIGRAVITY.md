# Skills 저장소

## 디렉토리 구조

```
skills/
├── CLAUDE.md            ← Claude 루트 진입점
├── ANTIGRAVITY.md       ← 현재 파일 (Antigravity 루트 진입점)
├── claude-skills/       → Claude Code 전용 스킬 (설치 위치: ~/.claude/skills/)
└── antigravity-skills/  → Antigravity 전용 스킬 (설치 위치: ~/.agents/skills/)
    ├── ANTIGRAVITY.md   ← antigravity-skills 작성 표준
    └── skills/
```

## 스킬 작성

- **antigravity-skills** 작성 시 → `antigravity-skills/ANTIGRAVITY.md` 참조
- **claude-skills** 작성 시 → `claude-skills/CLAUDE.md` 참조

## 스킬 추가 절차

1. `antigravity-skills/skills/` 안에 스킬 디렉토리 추가
2. `SKILL.md` 작성 (`antigravity-skills/ANTIGRAVITY.md` 표준 준수)
3. push 후 `npx github:yeonggyuchoi-usa/antigravity-skills install` 재실행

---

## GitHub MCP

- owner: `yeonggyuchoi-usa`
- repo: `antigravity-skills`
