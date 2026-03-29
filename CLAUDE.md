# Skills 저장소

## GitHub MCP — 반드시 읽을 것

이 디렉토리에는 두 개의 독립 GitHub 저장소가 있다.

### claude-skills
- owner: `yeonggyuchoi-usa`
- repo: `claude-skills`

**올바른 호출 예:**
- `list_issues(owner="yeonggyuchoi-usa", repo="claude-skills")`
- `create_issue(owner="yeonggyuchoi-usa", repo="claude-skills", title="...")`

### antigravity-skills
- owner: `yeonggyuchoi-usa`
- repo: `antigravity-skills`

**올바른 호출 예:**
- `list_issues(owner="yeonggyuchoi-usa", repo="antigravity-skills")`
- `create_issue(owner="yeonggyuchoi-usa", repo="antigravity-skills", title="...")`

---

## 디렉토리 구조

```
skills/
├── claude-skills/       → Claude Code 전용 스킬 (설치 위치: ~/.claude/skills/)
└── antigravity-skills/  → Antigravity 전용 스킬 (설치 위치: ~/.agents/skills/)
```

## 스킬 추가 규칙

1. 해당 레포의 `skills/` 폴더에 디렉토리 추가
2. `SKILL.md` 작성 (name, description, trigger 포함)
3. push 후 `npx github:yeonggyuchoi-usa/<repo> install` 재실행
