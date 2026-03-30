# Skills 저장소

## 디렉토리 구조

```
skills/
├── CLAUDE.md            ← 현재 파일 (Claude 루트 진입점)
├── ANTIGRAVITY.md       ← Antigravity 루트 진입점
├── claude-skills/       → Claude Code 전용 스킬 (설치 위치: ~/.claude/skills/)
│   ├── CLAUDE.md        ← claude-skills 작성 표준
│   └── skills/
└── antigravity-skills/  → Antigravity 전용 스킬 (설치 위치: ~/.agents/skills/)
    ├── ANTIGRAVITY.md   ← antigravity-skills 작성 표준
    └── skills/
```

## 스킬 작성

- **claude-skills** 작성 시 → `claude-skills/CLAUDE.md` 참조
- **antigravity-skills** 작성 시 → `antigravity-skills/ANTIGRAVITY.md` 참조

## 스킬 추가 절차

1. 해당 레포의 `skills/` 폴더에 디렉토리 추가
2. `SKILL.md` 작성 (해당 환경의 작성 표준 준수)
3. push 후 `npx github:yeonggyuchoi-usa/<repo> install` 재실행

---

## GitHub MCP — 반드시 읽을 것

이 디렉토리에는 두 개의 독립 GitHub 저장소가 있다.

### claude-skills
- owner: `yeonggyuchoi-usa`
- repo: `claude-skills`

### antigravity-skills
- owner: `yeonggyuchoi-usa`
- repo: `antigravity-skills`
