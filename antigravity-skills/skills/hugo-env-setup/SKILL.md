---
name: hugo-env-setup
description: Skill for AUTOMATICALLY setting up the local development environment for NSoft America Hugo blog.
---

# 🤖 자동 환경 구축 스킬 (Hugo-Env-Setup) — NSoft America

## Role
본 스킬이 호출되면, 사용자가 즉시 블로그 포스팅을 시작할 수 있도록 **AI 에이전트가 직접 모든 환경을 자동 구축**해야 합니다. 단순히 점검하는 것이 아니라, 누락된 도구가 있다면 설치하고 설정을 완료하는 것이 목적입니다.

---

## 🚀 자동 실행 단계 (Execution Protocol)

AI 에이전트는 본 스킬을 사용할 때 다음 단계를 **순차적으로 자동 실행**하십시오.

### 1. Hugo Extended 설치 자동화
- **현재 상태 확인**: `hugo version` 명령어를 실행하십시오.
- **자동 설치**: `hugo`가 없거나 Extended 버전이 아닌 경우, 다음 명령어를 즉시 실행하십시오.
  - **Windows**: `winget install Hugo.Hugo.Extended --accept-package-agreements --accept-source-agreements --silent`
  - **Mac**: `brew install hugo`
- **알림**: 설치 직후 사용자에게 "터미널(또는 에디터)을 재시작해야 새로운 hugo 명령어가 인식됩니다"라고 반드시 안내하십시오.

### 2. 테마 서브모듈 동기화 자동화
- **상태 확인**: `themes/PaperMod` 디렉토리가 비어있는지 확인하십시오.
- **자동 복구**: 비어있다면 다음 명령어를 실행하십시오.
  - `git submodule update --init --recursive`

### 3. Git 인증 및 메타데이터 설정 
- **설정 확인**: `git config user.name` 및 `user.email`을 확인하십시오.
- **자동 설정**: 설정이 비어있는 경우, 사용자의 GitHub 조직 정보를 바탕으로 설정을 제안하거나 직접 입력받아 구성하십시오.

### 4. MCP(Multi-Protocol) 환경 동기화
AI의 지능형 기능을 위해 다음 MCP 서버들의 활성화를 도와야 합니다.
- **NotebookLM**: 인포그래픽 및 심층 리서치를 위해 `nlm login` 실행을 사용자에게 요청하십시오.
- **GitHub/Google MCP**: `mcp_config.json`을 확인하고 필수 서버(`github-mcp`, `google-mcp`)가 등록되어 있는지 검증한 후, 누락 시 추가 가이드를 제공하십시오.

---

## 🚦 최종 검증 (Verification)
모든 자동 실행이 완료되면, 에이전트는 다음을 확인하여 사용자에게 보고하십시오.
1. ✅ **Hugo 버전**: Extended 버전 여부
2. ✅ **테마 리소스**: 파일 존재 여부
3. ✅ **인증 상태**: Git 및 MCP 로그인 성공 여부

---

## 사용 가이드
사용자가 **"hugo-env-setup 스킬로 설정 잡아줘"**라고 요청하면, AI는 위 프로토콜에 따라 터미널 명령어를 즉시 생성하고 실행 권한을 요청하십시오.
