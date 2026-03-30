# antigravity-skills

Antigravity 에이전트에서 사용할 수 있는 범용 스킬 모음입니다.

---

## 설치

```bash
# 전체 설치 — 글로벌 (모든 프로젝트에서 사용)
npx github:yeonggyuchoi-usa/antigravity-skills install

# 현재 프로젝트에만 설치
npx github:yeonggyuchoi-usa/antigravity-skills install --local

# 특정 스킬만 설치
npx github:yeonggyuchoi-usa/antigravity-skills install --skill hugo-blog-writer
```

설치 후 Antigravity가 실행되면 스킬이 자동으로 인식됩니다.

## 설치 경로

| 옵션 | 경로 | 적용 범위 |
|---|---|---|
| 기본 (글로벌) | `~/.agents/skills/` | 모든 프로젝트 |
| `--local` | `.agents/skills/` | 현재 프로젝트만 |

## 스킬 목록 확인 / 제거

```bash
# 사용 가능한 스킬 목록
npx github:yeonggyuchoi-usa/antigravity-skills list

# 전체 제거
npx github:yeonggyuchoi-usa/antigravity-skills uninstall

# 특정 스킬 제거
npx github:yeonggyuchoi-usa/antigravity-skills uninstall --skill <name>
```

## 스킬 작성 표준

새 스킬 작성 시 `ANTIGRAVITY.md` 참조.

---

## 스킬 목록

### `hugo-blog-writer`

**Hugo 기술 블로그 포스트 작성 스킬**

NSoft America Hugo 사이트에 기술 블로그 포스트를 작성합니다.
정해진 구조(서론-본론-결론), 시각적 포맷, 톤앤매너를 준수하여 고품질 포스트를 생성합니다.

**활용 시나리오:**
- Hugo 정적 사이트에 기술 블로그 포스트 작성
- 표준 front matter 및 파일 컨벤션 자동 적용
- Markdown 기반 콘텐츠 구조화 및 배포 워크플로우 실행

---

### `hugo-documentation`

**Hugo 기반 문서 작성 스킬**

Hugo 프로젝트의 문서 페이지를 구조에 맞게 생성하고 관리합니다.
`hugo new` 명령 기반으로 올바른 섹션과 front matter를 자동 적용합니다.

**활용 시나리오:**
- 프로젝트 문서 페이지 신규 생성
- 문서 디렉토리 구조 관리
- 아키타입 기반 표준 front matter 적용

---

### `hugo-env-setup`

**Hugo 개발 환경 자동 구축 스킬**

Hugo Extended 설치, 테마 서브모듈 동기화, Git 인증, MCP 환경 설정까지
Hugo 개발 환경 전체를 자동으로 구축합니다.

**활용 시나리오:**
- 새 머신에서 Hugo 개발 환경 셋업
- 테마 서브모듈 누락 시 자동 복구
- Git 인증 및 메타데이터 일괄 설정

---

### `hugo-report-writer`

**Hugo 전략 보고서 작성 스킬**

NSoft America Hugo 사이트에 경영/기술 전략 보고서를 작성합니다.
Executive Summary 중심의 구조, 시각적 권위 확보 포맷, Gemini/NLM 기반 리서치 통합을 지원합니다.

**활용 시나리오:**
- 기술 전략 보고서 및 분석 문서 작성
- Gartner 스타일의 권위 있는 문서 포맷 적용
- 리서치 기반 인사이트 문서화
