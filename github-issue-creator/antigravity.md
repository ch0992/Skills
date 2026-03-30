# GitHub Issue Creator — Antigravity 지시서

> **사용 시점:** Claude가 이슈 등록을 지시할 때, 또는 작업 완료 후 이슈 업데이트가 필요할 때.

---

## 이슈 제목 컨벤션

| 유형 | 제목 형식 | 라벨 |
|---|---|---|
| 부모 이슈 | `[v{버전} Phase{N}] {작업 내용}` | `enhancement` |
| 서브 이슈 | `[Sub #{부모번호} \| {작업유형}] {작업 내용}` | 없음 (bugfix면 `bug`) |
| 버그 리포트 | `[Bug] {내용}` | `bug` |

**작업유형:** `bugfix` / `enhancement` / `refactor` / `chore`

---

## GitHub CLI 명령어

### 이슈 생성

```bash
# 서브 이슈 생성 예시
gh issue create \
  --title "[Sub #32 | enhancement] 카메라 권한 처리 개선" \
  --body "$(cat <<'EOF'
## 개요
카메라 권한 거부 시 안내 팝업이 표시되지 않는 문제를 수정한다.

## 작업 내용
- [ ] 권한 거부 상태 감지
- [ ] 안내 팝업 UI 구현

## 완료 기준
- 권한 거부 시 설정 이동 팝업 표시

## 산출물
- `lib/features/camera/permission_handler.dart`

## 선행 조건
- #32 참고
EOF
)" \
  --repo NSoft-America-Inc/scanio

# 버그 이슈 생성 예시
gh issue create \
  --title "[Bug] OCR 결과가 빈 문자열로 반환됨" \
  --label bug \
  --body "..." \
  --repo NSoft-America-Inc/scanio
```

### 이슈 코멘트 추가 (완료 처리)

```bash
gh issue comment {이슈번호} \
  --body "## 완료
- 커밋: {커밋 해시 또는 링크}
- 수정 파일: \`lib/...\`" \
  --repo NSoft-America-Inc/scanio
```

### 이슈 close

```bash
gh issue close {이슈번호} --repo NSoft-America-Inc/scanio
```

### 마일스톤 목록 확인

```bash
gh api repos/NSoft-America-Inc/scanio/milestones?state=open
```

---

## 실행 순서

1. Claude의 지시서(`tasks/current.md`)에서 이슈 유형과 내용 확인
2. 위 컨벤션에 따라 제목/본문 구성
3. `gh issue create` 로 생성
4. 생성된 이슈 URL을 Claude에 보고
5. 서브 이슈라면 부모 이슈 번호를 `--body` 선행 조건에 명시

---

## 완료 후 보고 형식

```
✅ 이슈 생성 완료
- 번호: #XX
- 제목: [Sub #32 | enhancement] ...
- URL: https://github.com/NSoft-America-Inc/scanio/issues/XX
```

---

## 주의사항

- `--repo NSoft-America-Inc/scanio` 항상 명시 (생략 금지)
- 부모 이슈 생성 시 마일스톤 번호 일치 여부 반드시 확인
- close 전 반드시 산출물 코멘트 먼저 추가
