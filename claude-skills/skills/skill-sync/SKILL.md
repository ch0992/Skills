---
name: skill-sync
description: >
  Nsoft(Scanio)와 LinkNest 간 공통 스킬을 동기화하는 스킬.
  사용자가 명시적으로 "스킬 동기화", "스킬 싱크", "LinkNest에 스킬 업데이트",
  "skill sync", "스킬 마이그레이션", "새 스킬 LinkNest에 반영" 등을 언급할 때만
  사용한다. 프로젝트 전환이나 다른 작업 도중에는 자동으로 트리거하지 않는다.
---

# Skill Sync

Nsoft(Scanio)에서 개발된 공통 스킬을 LinkNest로 동기화한다.
평일 Scanio 개발 중 만들어진 범용 스킬이 주말 LinkNest 작업에도 바로 쓰일 수 있도록 유지한다.

---

## 스킬 분류

### 공통 스킬 — 동기화 대상

**Claude Skills**

| 스킬 | 비고 |
|------|------|
| `antigravity-workflow` | 핵심 협업 엔진 |
| `devlog-writer` | 개발 일지 자동화 |
| `github-issue-handler` | GitHub 이슈 생명주기 관리 |
| `next-session-writer` | 세션 인계 파일 작성 |

**Antigravity Skills**

| 스킬 | 비고 |
|------|------|
| `hugo-blog-writer` | 기술 블로그 포스팅 |
| `hugo-documentation` | Hugo 문서 관리 |
| `hugo-env-setup` | Hugo 환경 구축 |
| `hugo-report-writer` | 전략 보고서 작성 |

### Scanio 전용 — 동기화 제외

| 스킬 | 이유 |
|------|------|
| `noffice-writer` (Claude) | NOFFICE 업무 시스템 전용 |
| `flutter-web-verify` (Antigravity) | Scanio Flutter 프로젝트 전용 |

---

## 경로

| | Claude Skills | Antigravity Skills |
|--|--|--|
| **Nsoft** | `~/workspace/Nsoft/skills/claude-skills/skills/` | `~/workspace/Nsoft/skills/antigravity-skills/skills/` |
| **LinkNest** | `~/workspace/LinkNest/skills/claude-skills/skills/` | `~/workspace/LinkNest/skills/antigravity-skills/skills/` |

---

## 스킬 업데이트 순서

### Case A: 신규 스킬 생성 (Nsoft에서)

```
1. Nsoft/skills/claude-skills/skills/<name>/SKILL.md 작성
2. 분류 결정 → 공통 or Scanio 전용
3. 공통이면 → 이 파일의 "공통 스킬 목록"에 추가
4. Nsoft skills 커밋 & 푸시
5. skill-sync 실행 → LinkNest 반영 + 푸시
6. Claude Code 재시작
```

### Case B: 기존 공통 스킬 수정 (Nsoft에서)

```
1. Nsoft/skills/claude-skills/skills/<name>/SKILL.md 수정
2. Nsoft skills 커밋 & 푸시
3. skill-sync 실행 → LinkNest 자동 반영
```

### Case C: 스킬 삭제

```
1. Nsoft/skills에서 스킬 디렉토리 삭제
2. 이 파일의 분류 목록에서 제거
3. Nsoft skills 커밋 & 푸시
4. LinkNest/skills에서 동일 디렉토리 수동 삭제
5. LinkNest skills 커밋 & 푸시
```

> rsync는 추가/수정만 처리하고 삭제는 수동 처리가 필요하므로 Case D는 항상 수동이다.

---

## 동기화 절차

### Step 1: 현황 파악

```bash
echo "=== Claude Skills ===" && \
diff <(ls ~/workspace/Nsoft/skills/claude-skills/skills | sort) \
     <(ls ~/workspace/LinkNest/skills/claude-skills/skills | sort) && \
echo "=== Antigravity Skills ===" && \
diff <(ls ~/workspace/Nsoft/skills/antigravity-skills/skills | sort) \
     <(ls ~/workspace/LinkNest/skills/antigravity-skills/skills | sort)
```

`<` 표시: Nsoft에만 있음 (동기화 대상 or Scanio 전용 확인 필요)
`>` 표시: LinkNest에만 있음 (LinkNest 전용 스킬)

### Step 2: 공통 스킬 rsync

```bash
COMMON_CLAUDE=(antigravity-workflow devlog-writer github-issue-handler next-session-writer)
COMMON_ANTI=(hugo-blog-writer hugo-documentation hugo-env-setup hugo-report-writer)

for skill in "${COMMON_CLAUDE[@]}"; do
  rsync -a --delete \
    ~/workspace/Nsoft/skills/claude-skills/skills/$skill/ \
    ~/workspace/LinkNest/skills/claude-skills/skills/$skill/
  echo "✅ [Claude] $skill"
done

for skill in "${COMMON_ANTI[@]}"; do
  rsync -a --delete \
    ~/workspace/Nsoft/skills/antigravity-skills/skills/$skill/ \
    ~/workspace/LinkNest/skills/antigravity-skills/skills/$skill/
  echo "✅ [Anti] $skill"
done
```

### Step 3: 경로 하드코딩 경고 확인

동기화된 스킬 중 Scanio 전용 경로가 박혀있는 스킬이 있으면 사용자에게 알린다.

```bash
grep -rl "workspace/Nsoft\|NSoft-America-Inc\|yeonggyuchoi-usa\|noffice\|NOFFICE" \
  ~/workspace/LinkNest/skills/claude-skills/skills/ 2>/dev/null
```

발견 시: "다음 스킬에 Scanio 전용 경로가 포함되어 있습니다. LinkNest에서 실제로 사용할 때 동작이 다를 수 있습니다: [목록]"

### Step 4: 변경사항 확인 후 커밋 & 푸시

```bash
cd ~/workspace/LinkNest/skills
git status
git diff --stat
```

변경사항이 있으면:

```bash
cd ~/workspace/LinkNest/skills
git add claude-skills/skills/ antigravity-skills/skills/
git commit -m "chore: sync common skills from Nsoft ($(date +%Y-%m-%d))"
./push.sh
```

### Step 5: 글로벌 재설치 안내

스킬을 즉시 적용하려면 Claude Code를 재시작하거나 스킬을 재설치해야 함을 안내한다.

---

## 공통 스킬 목록 관리 방법

새 스킬을 Nsoft에서 개발할 때:
1. **범용 스킬** → 이 파일의 "공통 스킬 — 동기화 대상" 목록에 추가
2. **Scanio 전용** → "Scanio 전용 — 동기화 제외" 목록에 추가 및 이유 기재

스킬이 삭제될 때: 두 목록 모두에서 제거하고, LinkNest 디렉토리에서도 수동 삭제 후 커밋.
