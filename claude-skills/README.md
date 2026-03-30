# claude-skills

Claude Code에서 사용할 수 있는 범용 스킬 모음입니다.

---

## 설치

```bash
# 전체 설치 — 글로벌 (모든 프로젝트에서 사용)
npx github:yeonggyuchoi-usa/claude-skills install

# 현재 프로젝트에만 설치
npx github:yeonggyuchoi-usa/claude-skills install --local

# 특정 스킬만 설치
npx github:yeonggyuchoi-usa/claude-skills install --skill antigravity-workflow
```

설치 후 Claude Code를 실행하면 스킬이 자동으로 인식됩니다.

## 설치 경로

| 옵션 | 경로 | 적용 범위 |
|---|---|---|
| 기본 (글로벌) | `~/.claude/skills/` | 모든 프로젝트 |
| `--local` | `.claude/skills/` | 현재 프로젝트만 |

## 스킬 목록 확인 / 제거

```bash
# 사용 가능한 스킬 목록
npx github:yeonggyuchoi-usa/claude-skills list

# 전체 제거
npx github:yeonggyuchoi-usa/claude-skills uninstall

# 특정 스킬 제거
npx github:yeonggyuchoi-usa/claude-skills uninstall --skill <name>
```

## 스킬 작성 표준

새 스킬 작성 시 `CLAUDE.md` 참조.

---

## 스킬 목록

### `antigravity-workflow`

**트리거**: "antigravity", "anti", "작업지시", "anti에게 줘", "anti 완료했어", "current.md 써줘"

Claude Code(설계/계획)와 Antigravity(구현/실행) 두 AI 에이전트가 역할을 나눠 협업하는 워크플로우.

Claude는 직접 코드를 수정하지 않고 `tasks/current.md`에 작업지시서를 작성한다. Antigravity가 지시서를 받아 구현하고, 완료 보고가 오면 Claude가 결과를 검토하고 GitHub 이슈를 업데이트한다.

**워크플로우**:
```
논의/설계 → tasks/current.md 작성 → Antigravity 실행 → 완료 보고 → 이슈 업데이트
```

**작업지시서 형식**: 수정 파일, 배경, Fix 항목별 문제/해결, 완료 조건 포함.

**프로젝트 적용 시 설정 필요**:
- `tasks/current.md`, `tasks/reports/` 경로 규칙
- GitHub owner/repo

---

### `devlog-writer`

**트리거**: "devlog 써줘", "devlog 정리", "일지 정리", "오늘 일지"

오늘 날짜의 개발 일지(devlog)를 자동으로 작성하는 스킬. git log, tasks/reports/, GitHub 이슈를 종합해 하루 작업을 구조화된 마크다운 문서로 정리한다.

**수집 소스** (병렬 실행):
- `git log --oneline` — 오늘 머지된 커밋
- `tasks/reports/` — 오늘 날짜 작업 리포트
- `gh issue list --state closed` — 오늘 닫힌 이슈

**생성 파일**: `docs/6.devlog/YYYY-MM-DD.md`

**문서 구조**: Summary(3~5줄 산문) → 오늘 결정한 것들(주제별) → 이슈 현황 테이블 → 기술 메모(선택)

**작성 규칙**: 자연스러운 경어체, 과장 표현 및 작업량 자랑 금지, 핵심 코드 스니펫만 포함.

**프로젝트 적용 시 설정 필요**:
- devlog 저장 경로 (`docs/6.devlog/` 기본값)
- GitHub owner/repo
